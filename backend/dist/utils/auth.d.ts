import { UserRole } from '@prisma/client';
export interface JwtPayload {
    userId: string;
    email: string;
    role: UserRole;
}
export declare class AuthUtils {
    private static JWT_SECRET;
    private static JWT_EXPIRE_TIME;
    static hashPassword(password: string): Promise<string>;
    static comparePassword(password: string, hashedPassword: string): Promise<boolean>;
    static generateToken(payload: JwtPayload): string;
    static verifyToken(token: string): JwtPayload;
    static extractTokenFromHeader(authHeader: string | undefined): string | null;
}
//# sourceMappingURL=auth.d.ts.map