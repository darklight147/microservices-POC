import { NextFunction, Request, Response } from 'express';
import { UnauthorizedException } from '../errors/unauthorized-error';
import { ROLE } from '../services/jwt.service';

export const ensureRole = (role: ROLE) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (req.currentUser.roles.indexOf(role) === -1) {
			throw new UnauthorizedException();
		}

		next();
	};
};
