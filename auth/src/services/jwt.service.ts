import { Request } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { envVars } from '../config/env.config';
import { UnauthorizedException } from '../errors/unauthorized-error';
import userService from './user.service';

export enum ROLE {
	ADMIN = 'admin',
	VISITORS = 'visitors',
}

interface Payload {
	username: string;
	id: string;
	roles: string[];
}

interface RefreshPayload {
	id: string;
}

class JwtService {
	private EXPIRE_REFRESH = '90d';

	constructor(private options: jwt.SignOptions & jwt.VerifyOptions) {}

	public sign(payload: Payload) {
		return jwt.sign(payload, envVars.JWT_SECRET!, {
			...this.options,
		});
	}

	public verify(token: string) {
		try {
			return jwt.verify(token, envVars.JWT_SECRET!, {
				...this.options,
			}) as Payload;
		} catch (error) {
			return null;
		}
	}

	public async refresh(refreshToken: string) {
		const decoded = this.verifyRefreshToken(refreshToken);

		if (!decoded) {
			return null;
		}

		const user = await userService.findById(decoded.id);

		if (!user) {
			return null;
		}

		return this.sign({
			id: user.id,
			username: user.username,
			roles: user.roles.map((role) => role.name),
		});
	}

	public signRefresh(payload: RefreshPayload) {
		return jwt.sign(payload, envVars.JWT_REFRESH_SECRET!, {
			...this.options,
			expiresIn: this.EXPIRE_REFRESH,
		});
	}

	private verifyRefreshToken(token: string) {
		try {
			return jwt.verify(token, envVars.JWT_REFRESH_SECRET!, {
				...this.options,
			}) as RefreshPayload;
		} catch (error: any) {
			return null;
		}
	}

	public isTokenExpired(token: string) {
		const decoded = jwt.decode(token) as JwtPayload;
		const exp = (decoded.exp as number) * 1000;
		const now = Date.now();
		return now > exp;
	}
}

export default new JwtService({
	expiresIn: '15m',
});
