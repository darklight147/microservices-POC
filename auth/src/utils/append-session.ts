import { Request } from 'express';
import jwtService from '../services/jwt.service';
import { UserDoc } from '../services/user.service';
import { addDays } from './add-days';

export const appendSession = (req: Request, user: UserDoc) => {
	req.session = {
		jwt: jwtService.sign({
			id: user.id,
			username: user.username,
			roles: user.roles.map((role) => role.name),
		}),
		refresh: jwtService.signRefresh({
			id: user.id,
			username: user.username,
			roles: user.roles.map((role) => role.name),
		}),
	};

	req.sessionOptions.expires = addDays(new Date(), 90);
	req.sessionOptions.sameSite = 'lax';
};
