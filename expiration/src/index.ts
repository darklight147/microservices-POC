import { log } from '@quasimodo147/common';
import { checkVars } from './config/env.config';
import rabbitmqWrapper from './config/rabbitmq.wrapper';
import { GuestAccountCreatedListener } from './events/consumers/GuestAccountCreatedListener';

const start = async () => {
	checkVars();

	await rabbitmqWrapper.connect();

	log.init(rabbitmqWrapper.connection);

	new GuestAccountCreatedListener(rabbitmqWrapper.connection).listen();
};

start();
