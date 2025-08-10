import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorizeAdmin } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @route GET /api/cities
 * @desc Get all active cities (public for registration)
 * @access Public
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const cities = await prisma.city.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        state: true,
        pricePerKg: true,
        description: true
      }
    });

    return res.json({
      success: true,
      data: { cities }
    });
  } catch (error) {
    console.error('Error fetching cities:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

/**
 * @route GET /api/cities/admin
 * @desc Get all cities (including inactive) for admin
 * @access Private (Admin only)
 */
router.get('/admin', authenticate, authorizeAdmin, async (req: Request, res: Response) => {
  try {
    const cities = await prisma.city.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { users: true }
        }
      }
    });

    return res.json({
      success: true,
      data: { cities }
    });
  } catch (error) {
    console.error('Error fetching cities for admin:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

/**
 * @route POST /api/cities
 * @desc Create a new city
 * @access Private (Admin only)
 */
router.post(
  '/',
  authenticate,
  authorizeAdmin,
  [
    body('name').notEmpty().withMessage('City name is required'),
    body('state').notEmpty().withMessage('State is required'),
    body('pricePerKg').isFloat({ min: 0 }).withMessage('Price per kg must be a positive number'),
    body('description').optional().isString(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }

      const { name, state, pricePerKg, description } = req.body;

      // Check if city already exists
      const existingCity = await prisma.city.findUnique({
        where: { name }
      });

      if (existingCity) {
        return res.status(400).json({
          success: false,
          message: 'City with this name already exists'
        });
      }

      const city = await prisma.city.create({
        data: {
          name,
          state,
          pricePerKg: parseFloat(pricePerKg),
          description: description || null
        }
      });

      return res.status(201).json({
        success: true,
        message: 'City created successfully',
        data: { city }
      });
    } catch (error) {
      console.error('Error creating city:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
);

/**
 * @route PUT /api/cities/:id
 * @desc Update a city
 * @access Private (Admin only)
 */
router.put(
  '/:id',
  authenticate,
  authorizeAdmin,
  [
    body('name').optional().notEmpty().withMessage('City name cannot be empty'),
    body('state').optional().notEmpty().withMessage('State cannot be empty'),
    body('pricePerKg').optional().isFloat({ min: 0 }).withMessage('Price per kg must be a positive number'),
    body('description').optional().isString(),
    body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }

      const { id } = req.params;
      const { name, state, pricePerKg, description, isActive } = req.body;

      // Check if city exists
      const existingCity = await prisma.city.findUnique({
        where: { id }
      });

      if (!existingCity) {
        return res.status(404).json({
          success: false,
          message: 'City not found'
        });
      }

      // If updating name, check for duplicates
      if (name && name !== existingCity.name) {
        const duplicateCity = await prisma.city.findUnique({
          where: { name }
        });

        if (duplicateCity) {
          return res.status(400).json({
            success: false,
            message: 'City with this name already exists'
          });
        }
      }

      const updateData: any = {};
      if (name) updateData.name = name;
      if (state) updateData.state = state;
      if (pricePerKg !== undefined) updateData.pricePerKg = parseFloat(pricePerKg);
      if (description !== undefined) updateData.description = description;
      if (isActive !== undefined) updateData.isActive = isActive;

      const updatedCity = await prisma.city.update({
        where: { id },
        data: updateData
      });

      return res.json({
        success: true,
        message: 'City updated successfully',
        data: { city: updatedCity }
      });
    } catch (error) {
      console.error('Error updating city:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
);

/**
 * @route DELETE /api/cities/:id
 * @desc Delete a city (soft delete by setting isActive to false)
 * @access Private (Admin only)
 */
router.delete('/:id', authenticate, authorizeAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if city exists
    const existingCity = await prisma.city.findUnique({
      where: { id },
      include: {
        _count: {
          select: { users: true }
        }
      }
    });

    if (!existingCity) {
      return res.status(404).json({
        success: false,
        message: 'City not found'
      });
    }

    // Check if city has users
    if (existingCity._count.users > 0) {
      // Soft delete - just deactivate
      await prisma.city.update({
        where: { id },
        data: { isActive: false }
      });

      return res.json({
        success: true,
        message: 'City deactivated successfully (has users, cannot delete permanently)'
      });
    } else {
      // Hard delete if no users
      await prisma.city.delete({
        where: { id }
      });

      return res.json({
        success: true,
        message: 'City deleted successfully'
      });
    }
  } catch (error) {
    console.error('Error deleting city:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

/**
 * @route GET /api/cities/:id
 * @desc Get a specific city by ID
 * @access Public
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const city = await prisma.city.findUnique({
      where: { id },
      include: {
        _count: {
          select: { users: true }
        }
      }
    });

    if (!city) {
      return res.status(404).json({
        success: false,
        message: 'City not found'
      });
    }

    return res.json({
      success: true,
      data: { city }
    });
  } catch (error) {
    console.error('Error fetching city:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;