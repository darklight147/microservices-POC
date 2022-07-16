import { Request } from 'express';
import { jwtService } from '@quasimodo147/common';
import { UserDoc } from '../services/user.service';
import { addDays } from './add-days';

export const appendSession = async (req: Request, user: UserDoc) => {
	req.session = {
		jwt: await jwtService.sign({
			id: user.id,
			username: user.username,
			roles: user.roles.map((role) => role.name),
		}),
		refresh: await jwtService.signRefresh({
			id: user.id,
		}),
	};

	req.sessionOptions.expires = addDays(new Date(), 90);
};
