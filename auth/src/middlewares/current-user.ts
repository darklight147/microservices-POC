import { NextFunction, Request, Response } from 'express';
import jwtService from '../services/jwt.service';
import { isTokenExpired } from '../utils/istoken-expired';

export const currentUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	req.currentUser = null;

	const token = req.session!.jwt;

	if (token) {
		let currentUser = jwtService.verify(token);

		if (!currentUser && isTokenExpired(token)) {
			if (req.session!.refresh) {
				const newAccessToken = await jwtService.refresh(req);

				req.session!.jwt = newAccessToken;

				currentUser = jwtService.verify(newAccessToken);
			}
		}

		req.currentUser = currentUser;
	}

	next();
};
