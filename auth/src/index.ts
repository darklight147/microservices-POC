import 'express-async-errors';
import express from 'express';
import { checkVars, envVars } from './config/env.config';
import { authRouter } from './routes/auth.routes';
import { healthRrouter } from './routes/health.routes';
import { errorHandler } from './controllers/error.controller';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import roleService from './services/role.service';
import helmet from 'helmet';
import cors from 'cors';
import { GuestUserExpiredListener } from './events/consumers/GuestUserExpiredListener';
import rabbitmqWrappers from './config/rabbitmq.wrappers';
import { currentUser } from '@quasimodo147/common';
import { refreshUser } from './middlewares/refresh-user';
import { ROLE, NotFoundException } from '@quasimodo147/common';

async function start() {
	checkVars();

	await mongoose.connect(envVars.MONGO_URI!);

	/**
	 * DBs seed
	 */

	const roles = ['admin', 'visitor'] as ROLE[];

	for await (const role of roles) {
		await roleService.createIfNotExists(role);
	}

	await rabbitmqWrappers.connect();

	/**
	 * Init Consumers
	 */

	await new GuestUserExpiredListener(rabbitmqWrappers.connection).listen();

	const app = express();
	app.set('trust proxy', 1);

	/**
	 * Map Middlewares
	 */

	app.use(helmet.xssFilter());
	app.use(helmet.hidePoweredBy());
	app.use(helmet.noSniff());

	app.use(
		cors({
			credentials: true,
			origin: true,
		}),
	);

	app.use(express.json({ limit: '10mb' }));
	app.use(
		cookieSession({
			signed: false,
			httpOnly: true,
			name: 'session:store',
			sameSite: 'lax',
		}),
	);
	app.use(currentUser);
	app.use(refreshUser);

	/**
	 * Map routes
	 */

	app.use('/api/auth', authRouter);
	app.use('/api/auth', healthRrouter);

	app.all('*', (req, res) => {
		throw new NotFoundException();
	});

	app.use(errorHandler);

	app.listen(envVars.PORT, () =>
		console.log('Listening', `http://localhost:${envVars.PORT}`),
	);
}

start();
