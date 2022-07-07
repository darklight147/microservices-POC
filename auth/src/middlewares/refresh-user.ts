import { NextFunction, Request, Response } from 'express';
import { jwtService } from '@quasimodo147/common';
import userService from '../services/user.service';

export const refreshUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.currentUser) {
		return next();
	}

	const { jwt, refresh } = req.session!;

	if (!refresh) {
		return next();
	}

	if (!jwtService.isTokenExpired(jwt)) return next();

	/**
	 * Attempt to refresh the access token using the refresh token
	 */

	try {
		const payload = jwtService.verifyRefreshToken(refresh);

		if (!payload) {
			return next();
		}

		const user = await userService.findById(payload.id);

		if (!user) return next();

		const newToken = jwtService.sign({
			id: user.id,
			roles: user.roles.map((role) => role.name),
			username: user.username,
		});

		req.currentUser = jwtService.verify(newToken);
		req.session!.jwt = newToken;
	} catch (error: any) {}

	next();
};
