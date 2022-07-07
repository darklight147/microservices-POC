import { Request, Response } from 'express';
import rabbitmqWrappers from '../config/rabbitmq.wrappers';
import { UnauthorizedException } from '@quasimodo147/common';
import { GuestUserExpirePublisher } from '../events/publishers/GuestUserPublisher';
import passwordService from '../services/password.service';
import roleService from '../services/role.service';
import userService, { UserDoc } from '../services/user.service';
import { appendSession } from '../utils/append-session';
import { StatusCodes } from 'http-status-codes';
import { BadRequestException } from '@quasimodo147/common';
import { ROLE } from '@quasimodo147/common';

export class AuthController {
	private static GUEST_EXPIRATION_WINDOW: number = 15; // Minutes

	public async login(req: Request, res: Response) {
		const { username, password } = req.body;

		const user = await userService.findByUsername(username);

		if (!user) throw new BadRequestException('Wrong username or password');

		if (!(await passwordService.compare(user.password, password)))
			throw new BadRequestException('Wrong username or password');

		appendSession(req, user);

		res.status(200).json(user);
	}

	public async signup(req: Request, res: Response) {
		const { username, password } = req.body;

		const user = await userService.findByUsername(username);

		if (user)
			throw new BadRequestException(
				'User with this username already exists',
			);

		const roles = [await roleService.findByName(ROLE.ADMIN)] as any;

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

		res.status(StatusCodes.NO_CONTENT).send();
	}

	public async signupVisitor(req: Request, res: Response) {
		const { username, password } = req.body;

		const user = await userService.findByUsername(username);

		const visitorRole = (await roleService.findByName(ROLE.VISITOR)) as any;

		if (user) {
			const roles = user.roles;

			if (userService.hasRole(user, ROLE.VISITOR)) {
				throw new BadRequestException(
					'User with this username already exists',
				);
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

		const expirationDate = new Date();

		expirationDate.setMinutes(
			expirationDate.getMinutes() +
				AuthController.GUEST_EXPIRATION_WINDOW,
		);

		new GuestUserExpirePublisher(rabbitmqWrappers.connection).publish({
			userId: createdUser.id,
			expiresAt: expirationDate.toISOString(),
		});

		res.status(200).json(createdUser);
	}

	public async deleteMe(req: Request, res: Response) {
		const { id } = req.currentUser;
		const user = await userService.findById(id);
		if (!user) throw new UnauthorizedException();

		await user.remove();
		res.status(StatusCodes.NO_CONTENT).send();
	}

	public async updateMe(req: Request, res: Response) {
		const { id } = req.currentUser;
		const user = await userService.findById(id);

		if (!user) throw new UnauthorizedException();

		const newUser = await userService.update(user.id, req.body);
		res.status(200).json(newUser);
	}
}

export default new AuthController();
