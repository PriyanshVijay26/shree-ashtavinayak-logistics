"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const client_1 = require("@prisma/client");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.get('/', async (req, res) => {
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
    }
    catch (error) {
        console.error('Error fetching cities:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});
router.get('/admin', auth_1.authenticate, auth_1.authorizeAdmin, async (req, res) => {
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
    }
    catch (error) {
        console.error('Error fetching cities for admin:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});
router.post('/', auth_1.authenticate, auth_1.authorizeAdmin, [
    (0, express_validator_1.body)('name').notEmpty().withMessage('City name is required'),
    (0, express_validator_1.body)('state').notEmpty().withMessage('State is required'),
    (0, express_validator_1.body)('pricePerKg').isFloat({ min: 0 }).withMessage('Price per kg must be a positive number'),
    (0, express_validator_1.body)('description').optional().isString(),
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
        const { name, state, pricePerKg, description } = req.body;
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
    }
    catch (error) {
        console.error('Error creating city:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});
router.put('/:id', auth_1.authenticate, auth_1.authorizeAdmin, [
    (0, express_validator_1.body)('name').optional().notEmpty().withMessage('City name cannot be empty'),
    (0, express_validator_1.body)('state').optional().notEmpty().withMessage('State cannot be empty'),
    (0, express_validator_1.body)('pricePerKg').optional().isFloat({ min: 0 }).withMessage('Price per kg must be a positive number'),
    (0, express_validator_1.body)('description').optional().isString(),
    (0, express_validator_1.body)('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
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
        const { id } = req.params;
        const { name, state, pricePerKg, description, isActive } = req.body;
        const existingCity = await prisma.city.findUnique({
            where: { id }
        });
        if (!existingCity) {
            return res.status(404).json({
                success: false,
                message: 'City not found'
            });
        }
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
        const updateData = {};
        if (name)
            updateData.name = name;
        if (state)
            updateData.state = state;
        if (pricePerKg !== undefined)
            updateData.pricePerKg = parseFloat(pricePerKg);
        if (description !== undefined)
            updateData.description = description;
        if (isActive !== undefined)
            updateData.isActive = isActive;
        const updatedCity = await prisma.city.update({
            where: { id },
            data: updateData
        });
        return res.json({
            success: true,
            message: 'City updated successfully',
            data: { city: updatedCity }
        });
    }
    catch (error) {
        console.error('Error updating city:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});
router.delete('/:id', auth_1.authenticate, auth_1.authorizeAdmin, async (req, res) => {
    try {
        const { id } = req.params;
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
        if (existingCity._count.users > 0) {
            await prisma.city.update({
                where: { id },
                data: { isActive: false }
            });
            return res.json({
                success: true,
                message: 'City deactivated successfully (has users, cannot delete permanently)'
            });
        }
        else {
            await prisma.city.delete({
                where: { id }
            });
            return res.json({
                success: true,
                message: 'City deleted successfully'
            });
        }
    }
    catch (error) {
        console.error('Error deleting city:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});
router.get('/:id', async (req, res) => {
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
    }
    catch (error) {
        console.error('Error fetching city:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});
exports.default = router;
//# sourceMappingURL=cities.js.map