import { NextFunction, Request, Response } from 'express';
import { ForbiddenException } from '../errors/forbidden-error';
import { UnauthorizedException } from '../errors/unauthorized-error';
import { ROLE } from '../services/jwt.service';

export const ensureRole = (roles: ROLE[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (!req.currentUser) {
			throw new UnauthorizedException();
		}

		const userRoles = req.currentUser.roles;
		const hasRole = roles.some((role) => userRoles.includes(role));
		if (!hasRole) {
			throw new ForbiddenException("You don't have permission to do this");
		}
		next();
	};
};
