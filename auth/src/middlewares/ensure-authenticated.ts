import { NextFunction, Request, Response } from 'express';
import { UnauthorizedException } from '../errors/unauthorized-error';

export const ensureAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.currentUser) {
		throw new UnauthorizedException();
	}

	next();
};
