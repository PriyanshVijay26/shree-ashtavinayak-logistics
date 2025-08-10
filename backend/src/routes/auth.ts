import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { PrismaClient, UserRole } from '@prisma/client';
import { AuthUtils } from '../utils/auth';
import { authenticate } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('cityId').notEmpty().withMessage('City selection is required'),
  ],
  async (req: Request, res: Response) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }

      const { email, password, firstName, lastName, cityId } = req.body;

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User already exists with this email'
        });
      }

      // Verify city exists and is active
      const city = await prisma.city.findFirst({
        where: { 
          id: cityId,
          isActive: true
        }
      });

      if (!city) {
        return res.status(400).json({
          success: false,
          message: 'Selected city is not available'
        });
      }

      // Hash password
      const hashedPassword = await AuthUtils.hashPassword(password);

      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          cityId,
          role: UserRole.USER
        },
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

      // Generate JWT token
      const token = AuthUtils.generateToken({
        userId: user.id,
        email: user.email,
        role: user.role
      });

      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            city: user.city
          },
          token
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error during registration'
      });
    }
  }
);

/**
 * @route POST /api/auth/login
 * @desc Login user
 * @access Public
 */
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req: Request, res: Response) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }

      const { email, password } = req.body;

      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email },
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
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Verify password
      const isPasswordValid = await AuthUtils.comparePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Generate JWT token
      const token = AuthUtils.generateToken({
        userId: user.id,
        email: user.email,
        role: user.role
      });

      return res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            city: user.city
          },
          token
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error during login'
      });
    }
  }
);

/**
 * @route GET /api/auth/profile
 * @desc Get current user profile
 * @access Private
 */
router.get('/profile', authenticate, async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
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

    return res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          city: user.city,
          createdAt: user.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

/**
 * @route PUT /api/auth/profile
 * @desc Update user profile
 * @access Private
 */
router.put(
  '/profile',
  authenticate,
  [
    body('firstName').optional().notEmpty().withMessage('First name cannot be empty'),
    body('lastName').optional().notEmpty().withMessage('Last name cannot be empty'),
    body('cityId').optional().notEmpty().withMessage('City ID cannot be empty'),
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

      const { firstName, lastName, cityId } = req.body;
      const updateData: any = {};

      if (firstName) updateData.firstName = firstName;
      if (lastName) updateData.lastName = lastName;
      
      if (cityId) {
        // Verify city exists and is active
        const city = await prisma.city.findFirst({
          where: { 
            id: cityId,
            isActive: true
          }
        });

        if (!city) {
          return res.status(400).json({
            success: false,
            message: 'Selected city is not available'
          });
        }
        updateData.cityId = cityId;
      }

      const updatedUser = await prisma.user.update({
        where: { id: req.user!.userId },
        data: updateData,
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

      return res.json({
        success: true,
        message: 'Profile updated successfully',
        data: {
          user: {
            id: updatedUser.id,
            email: updatedUser.email,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            role: updatedUser.role,
            city: updatedUser.city
          }
        }
      });
    } catch (error) {
      console.error('Profile update error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
);

export default router;