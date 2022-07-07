import { Request } from 'express';
import { jwtService } from '@quasimodo147/common';
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
		}),
	};

	req.sessionOptions.expires = addDays(new Date(), 90);
};
