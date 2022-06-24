import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { envVars } from '../config/env.config';
import { UnauthorizedException } from '../errors/unauthorized-error';

export type ROLE = 'admin' | 'visitors';

interface Payload {
	username: string;
	id: string;
	roles: string[];
}

class JwtService {
	private EXPIRE_REFRESH = '90d';

	constructor(private options: jwt.SignOptions & jwt.VerifyOptions) {}

	public sign(payload: Payload) {
		return jwt.sign(payload, envVars.JWT_SECRET, {
			...this.options,
		});
	}

	public verify(token: string) {
		try {
			return jwt.verify(token, envVars.JWT_SECRET, {
				...this.options,
			}) as Payload;
		} catch (error) {
			return null;
		}
	}

	public refresh(req: Request) {
		const decoded = this.verify(req.session!.refresh);

		if (!decoded) {
			throw new UnauthorizedException();
		}

		return this.sign(decoded);
	}

	public signRefresh(payload: Payload) {
		return jwt.sign(payload, envVars.JWT_REFRESH_SECRET, {
			...this.options,
			expiresIn: this.EXPIRE_REFRESH,
		});
	}
}

export default new JwtService({
	expiresIn: '15m',
});
