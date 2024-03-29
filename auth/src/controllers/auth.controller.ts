import {
	BadRequestException,
	log,
	ROLE,
	UnauthorizedException,
} from '@quasimodo147/common';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import rabbitmqWrappers from '../config/rabbitmq.wrappers';
import { GuestUserExpirePublisher } from '../events/publishers/GuestUserPublisher';
import passwordService from '../services/password.service';
import roleService from '../services/role.service';
import userService from '../services/user.service';
import { appendSession } from '../utils/append-session';
import { logger } from '../utils/logger';

export class AuthController {
	private static GUEST_EXPIRATION_WINDOW: number = 2; // Minutes

	public async login(req: Request, res: Response) {
		const { username, password } = req.body;

		const user = await userService.findByUsername(username);

		if (!user) throw new BadRequestException('Wrong username or password');

		if ((await passwordService.compare(user.password, password)) === false)
			throw new BadRequestException('Wrong username or password');

		await appendSession(req, user);

		log.info(`User ${user.username} logged in`);

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

		await appendSession(req, createdUser);

		res.status(200).json(createdUser);
	}

	public me(req: Request, res: Response) {
		res.json({
			currentUser: req.currentUser,
		});
	}

	public logout(req: Request, res: Response) {
		req.session = undefined;

		if (req.currentUser)
			log.info(`User ${req.currentUser.username} logged out`);

		res.status(StatusCodes.NO_CONTENT).send();
	}

	public async signupVisitor(req: Request, res: Response) {
		const { username, password } = req.body;

		const user = await userService.findByUsername(username);

		const visitorRole = (await roleService.findByName(ROLE.VISITOR)) as any;

		if (user) {
			const roles = user.roles;

			if (userService.hasRole(user, ROLE.VISITOR))
				throw new BadRequestException(
					'User with this username already exists',
				);

			roles.push(visitorRole);

			await user.save();

			await appendSession(req, user);

			return res.status(200).json(user);
		}

		const createdUser = await userService.create({
			password: await passwordService.hash(password),
			username,
			roles: [visitorRole],
		});

		await appendSession(req, createdUser);

		const expirationDate = new Date();

		expirationDate.setMinutes(
			expirationDate.getMinutes() +
				AuthController.GUEST_EXPIRATION_WINDOW,
		);

		new GuestUserExpirePublisher(rabbitmqWrappers.connection).publish({
			userId: createdUser.id,
			expiresAt: expirationDate.toISOString(),
		});

		log.info(`Temp User ${createdUser.username} created`, createdUser);

		log.info(
			`Temp User ${createdUser.username} expires at ${expirationDate}`,
		);

		logger.info(
			`Temp User ${createdUser.username} expires at ${expirationDate}`,
		);

		res.status(200).json(createdUser);
	}

	public async deleteMe(req: Request, res: Response) {
		const { id } = req.currentUser;
		const user = await userService.findById(id);
		if (!user) throw new UnauthorizedException();

		await user.remove();

		log.info(`User ${user.username} deleted`, user);

		res.status(StatusCodes.NO_CONTENT).send();
	}

	public async updateMe(req: Request, res: Response) {
		const { id } = req.currentUser;
		const user = await userService.findById(id);

		if (!user) throw new UnauthorizedException();

		const newUser = await userService.update(user.id, req.body);

		log.info(`User ${user.username} updated`, user);
		res.status(200).json(newUser);
	}
}

export default new AuthController();
