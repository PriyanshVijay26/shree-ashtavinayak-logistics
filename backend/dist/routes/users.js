"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.get('/', auth_1.authenticate, auth_1.authorizeAdmin, async (req, res) => {
    try {
        const { page = 1, limit = 10, role, search } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);
        const where = {};
        if (role && (role === 'ADMIN' || role === 'USER')) {
            where.role = role;
        }
        if (search) {
            where.OR = [
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } }
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
    }
    catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});
router.get('/:id', auth_1.authenticate, auth_1.authorizeAdmin, async (req, res) => {
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
    }
    catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});
router.put('/:id/role', auth_1.authenticate, auth_1.authorizeAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        if (!role || (role !== 'ADMIN' && role !== 'USER')) {
            return res.status(400).json({
                success: false,
                message: 'Valid role (ADMIN or USER) is required'
            });
        }
        const existingUser = await prisma.user.findUnique({
            where: { id }
        });
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        if (existingUser.id === req.user.userId && role === 'USER') {
            return res.status(400).json({
                success: false,
                message: 'You cannot demote yourself'
            });
        }
        const updatedUser = await prisma.user.update({
            where: { id },
            data: { role: role },
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
    }
    catch (error) {
        console.error('Error updating user role:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});
router.delete('/:id', auth_1.authenticate, auth_1.authorizeAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const existingUser = await prisma.user.findUnique({
            where: { id }
        });
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        if (existingUser.id === req.user.userId) {
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
    }
    catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});
router.get('/stats/overview', auth_1.authenticate, auth_1.authorizeAdmin, async (req, res) => {
    try {
        const [totalUsers, adminUsers, regularUsers, recentUsers] = await Promise.all([
            prisma.user.count(),
            prisma.user.count({ where: { role: client_1.UserRole.ADMIN } }),
            prisma.user.count({ where: { role: client_1.UserRole.USER } }),
            prisma.user.count({
                where: {
                    createdAt: {
                        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
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
    }
    catch (error) {
        console.error('Error fetching user stats:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});
exports.default = router;
//# sourceMappingURL=users.js.map