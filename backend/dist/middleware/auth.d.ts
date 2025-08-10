import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from '../utils/auth';
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}
export declare const authenticate: (req: Request, res: Response, next: NextFunction) => void;
export declare const authorizeAdmin: (req: Request, res: Response, next: NextFunction) => void;
export declare const authorizeUser: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.d.ts.map