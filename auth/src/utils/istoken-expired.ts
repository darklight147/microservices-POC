import jwt, { JwtPayload } from 'jsonwebtoken';

export const isTokenExpired = (token: string) => {
	const decoded = jwt.decode(token) as JwtPayload;
	const exp = (decoded.exp as number) * 1000;
	const now = Date.now();
	return now > exp;
};
