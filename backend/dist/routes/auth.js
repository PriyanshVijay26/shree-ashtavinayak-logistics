"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const client_1 = require("@prisma/client");
const auth_1 = require("../utils/auth");
const auth_2 = require("../middleware/auth");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.post('/register', [
    (0, express_validator_1.body)('email').isEmail().withMessage('Please provide a valid email'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    (0, express_validator_1.body)('firstName').notEmpty().withMessage('First name is required'),
    (0, express_validator_1.body)('lastName').notEmpty().withMessage('Last name is required'),
    (0, express_validator_1.body)('cityId').notEmpty().withMessage('City selection is required'),
], async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation errors',
                errors: errors.array()
            });
        }
        const { email, password, firstName, lastName, cityId } = req.body;
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }
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
        const hashedPassword = await auth_1.AuthUtils.hashPassword(password);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                cityId,
                role: client_1.UserRole.USER
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
        const token = auth_1.AuthUtils.generateToken({
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
    }
    catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error during registration'
        });
    }
});
router.post('/login', [
    (0, express_validator_1.body)('email').isEmail().withMessage('Please provide a valid email'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required'),
], async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation errors',
                errors: errors.array()
            });
        }
        const { email, password } = req.body;
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
        const isPasswordValid = await auth_1.AuthUtils.comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        const token = auth_1.AuthUtils.generateToken({
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
    }
    catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error during login'
        });
    }
});
router.get('/profile', auth_2.authenticate, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
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
    }
    catch (error) {
        console.error('Profile fetch error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});
router.put('/profile', auth_2.authenticate, [
    (0, express_validator_1.body)('firstName').optional().notEmpty().withMessage('First name cannot be empty'),
    (0, express_validator_1.body)('lastName').optional().notEmpty().withMessage('Last name cannot be empty'),
    (0, express_validator_1.body)('cityId').optional().notEmpty().withMessage('City ID cannot be empty'),
], async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation errors',
                errors: errors.array()
            });
        }
        const { firstName, lastName, cityId } = req.body;
        const updateData = {};
        if (firstName)
            updateData.firstName = firstName;
        if (lastName)
            updateData.lastName = lastName;
        if (cityId) {
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
            where: { id: req.user.userId },
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
    }
    catch (error) {
        console.error('Profile update error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map