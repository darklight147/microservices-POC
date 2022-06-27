import { NextFunction, Request, Response } from 'express';
import jwtService from '../services/jwt.service';

export const currentUser = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	req.currentUser = null;

	const token = req.session!.jwt;

	if (token) {
		let currentUser = jwtService.verify(token);

		if (!currentUser && req.session!.refresh) {
			const refreshedToken = jwtService.refresh(req);

			req.session!.jwt = refreshedToken;

			currentUser = jwtService.verify(refreshedToken);
		}

		req.currentUser = currentUser;
	}

	next();
};
