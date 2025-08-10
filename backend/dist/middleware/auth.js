"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeUser = exports.authorizeAdmin = exports.authenticate = void 0;
const client_1 = require("@prisma/client");
const auth_1 = require("../utils/auth");
const authenticate = (req, res, next) => {
    try {
        const token = auth_1.AuthUtils.extractTokenFromHeader(req.headers.authorization);
        if (!token) {
            res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
            return;
        }
        const decoded = auth_1.AuthUtils.verifyToken(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: 'Invalid token.'
        });
        return;
    }
};
exports.authenticate = authenticate;
const authorizeAdmin = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({
            success: false,
            message: 'Authentication required.'
        });
        return;
    }
    if (req.user.role !== client_1.UserRole.ADMIN) {
        res.status(403).json({
            success: false,
            message: 'Access denied. Admin privileges required.'
        });
        return;
    }
    next();
};
exports.authorizeAdmin = authorizeAdmin;
const authorizeUser = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({
            success: false,
            message: 'Authentication required.'
        });
        return;
    }
    next();
};
exports.authorizeUser = authorizeUser;
//# sourceMappingURL=auth.js.map