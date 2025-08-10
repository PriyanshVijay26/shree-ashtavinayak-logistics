import express, { Request, Response } from 'express';
import { PrismaClient, UserRole } from '@prisma/client';
import { authenticate, authorizeAdmin } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @route GET /api/users
 * @desc Get all users (Admin only)
 * @access Private (Admin only)
 */
router.get('/', authenticate, authorizeAdmin, async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;
    
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    // Build where clause
    const where: any = {};
    
    if (role && (role === 'ADMIN' || role === 'USER')) {
      where.role = role as UserRole;
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search as string, mode: 'insensitive' } },
        { lastName: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          city: {
            select: {
              id: true,
              name: true,
              state: true,
              pricePerKg: true
            }
          }
        }
      }),
      prisma.user.count({ where })
    ]);

    // Remove password from response
    const sanitizedUsers = users.map(user => ({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      city: user.city,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));

    return res.json({
      success: true,
      data: {
        users: sanitizedUsers,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(totalCount / take),
          totalCount,
          hasNext: skip + take < totalCount,
          hasPrev: Number(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

/**
 * @route GET /api/users/:id
 * @desc Get a specific user by ID (Admin only)
 * @access Private (Admin only)
 */
router.get('/:id', authenticate, authorizeAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        city: {
          select: {
            id: true,
            name: true,
            state: true,
            pricePerKg: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Remove password from response
    const sanitizedUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      city: user.city,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return res.json({
      success: true,
      data: { user: sanitizedUser }
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

/**
 * @route PUT /api/users/:id/role
 * @desc Update user role (Admin only)
 * @access Private (Admin only)
 */
router.put('/:id/role', authenticate, authorizeAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role || (role !== 'ADMIN' && role !== 'USER')) {
      return res.status(400).json({
        success: false,
        message: 'Valid role (ADMIN or USER) is required'
      });
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent admin from demoting themselves
    if (existingUser.id === req.user!.userId && role === 'USER') {
      return res.status(400).json({
        success: false,
        message: 'You cannot demote yourself'
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role: role as UserRole },
      include: {
        city: {
          select: {
            id: true,
            name: true,
            state: true,
            pricePerKg: true
          }
        }
      }
    });

    // Remove password from response
    const sanitizedUser = {
      id: updatedUser.id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      role: updatedUser.role,
      city: updatedUser.city,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt
    };

    return res.json({
      success: true,
      message: 'User role updated successfully',
      data: { user: sanitizedUser }
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

/**
 * @route DELETE /api/users/:id
 * @desc Delete a user (Admin only)
 * @access Private (Admin only)
 */
router.delete('/:id', authenticate, authorizeAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent admin from deleting themselves
    if (existingUser.id === req.user!.userId) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete yourself'
      });
    }

    await prisma.user.delete({
      where: { id }
    });

    return res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

/**
 * @route GET /api/users/stats/overview
 * @desc Get user statistics (Admin only)
 * @access Private (Admin only)
 */
router.get('/stats/overview', authenticate, authorizeAdmin, async (req: Request, res: Response) => {
  try {
    const [totalUsers, adminUsers, regularUsers, recentUsers] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: UserRole.ADMIN } }),
      prisma.user.count({ where: { role: UserRole.USER } }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
          }
        }
      })
    ]);

    return res.json({
      success: true,
      data: {
        stats: {
          totalUsers,
          adminUsers,
          regularUsers,
          recentUsers
        }
      }
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;