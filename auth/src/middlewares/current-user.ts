import { NextFunction, Request, Response } from 'express';
import jwtService from '../services/jwt.service';

export const currentUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	req.currentUser = null;

	const token = req.session!.jwt;

	if (token) {
		let currentUser = jwtService.verify(token);

		if (currentUser) {
			req.currentUser = currentUser;

			return next();
		}

		if (jwtService.isTokenExpired(token) && req.session!.refresh) {
			const newToken = await jwtService.refresh(req.session!.refresh);

			if (newToken) {
				req.session!.jwt = newToken;
				req.currentUser = jwtService.verify(newToken);
			}

			return next();
		}
	}

	next();
};
