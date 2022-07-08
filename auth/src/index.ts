import { currentUser, NotFoundException, ROLE } from '@quasimodo147/common';
import cookieSession from 'cookie-session';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { checkVars, envVars } from './config/env.config';
import rabbitmqWrappers from './config/rabbitmq.wrappers';
import { errorHandler } from './controllers/error.controller';
import { GuestUserExpiredListener } from './events/consumers/GuestUserExpiredListener';
import { refreshUser } from './middlewares/refresh-user';
import { authRouter } from './routes/auth.routes';
import { healthRrouter } from './routes/health.routes';
import roleService from './services/role.service';
import logger from './utils/logger';

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

	logger.init();

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
