import { Request, Response } from 'express';
import rabbitmqWrappers from '../config/rabbitmq.wrappers';
import { UnauthorizedException } from '../errors/unauthorized-error';
import { GuestUserExpirePublisher } from '../events/publishers/GuestUserPublisher';
import passwordService from '../services/password.service';
import roleService from '../services/role.service';
import userService, { UserDoc } from '../services/user.service';
import { appendSession } from '../utils/append-session';

export class AuthController {
	public async login(req: Request, res: Response) {
		const { username, password } = req.body;

		const user = await userService.findByUsername(username);

		if (!user) {
			throw new UnauthorizedException();
		}

		if (!(await passwordService.compare(user.password, password))) {
			throw new UnauthorizedException();
		}

		appendSession(req, user);

		res.status(200).json(user);
	}

	public async signup(req: Request, res: Response) {
		const { username, password } = req.body;

		const user = await userService.findByUsername(username);

		if (user) {
			throw new UnauthorizedException();
		}

		const roles = [await roleService.findByName('admin')] as any;

		const createdUser = await userService.create({
			password: await passwordService.hash(password),
			username,
			roles,
		});

		appendSession(req, createdUser);

		res.status(200).json(createdUser);
	}

	public me(req: Request, res: Response) {
		res.json({
			currentUser: req.currentUser,
		});
	}

	public logout(req: Request, res: Response) {
		req.session = undefined;

		res.status(204).send();
	}

	public async signupVisitor(req: Request, res: Response) {
		const { username, password } = req.body;

		const user = await userService.findByUsername(username);

		const visitorRole = (await roleService.findByName('visitors')) as any;

		if (user) {
			const roles = user.roles;

			if (userService.hasRole(user, 'visitors')) {
				throw new UnauthorizedException();
			}

			roles.push(visitorRole);

			await user.save();

			appendSession(req, user);

			return res.status(200).json(user);
		}

		const createdUser = await userService.create({
			password: await passwordService.hash(password),
			username,
			roles: [visitorRole],
		});

		appendSession(req, createdUser);

		new GuestUserExpirePublisher(rabbitmqWrappers.connection).publish({
			userId: createdUser.id,
		});

		res.status(200).json(createdUser);
	}
}

export default new AuthController();
