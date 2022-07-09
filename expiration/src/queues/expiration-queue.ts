import { log } from '@quasimodo147/common';
import Queue from 'bull';
import { envVars } from '../config/env.config';
import rabbitmqWrapper from '../config/rabbitmq.wrapper';
import { GuestAccountExpiredPublisher } from '../events/publishers/GuestAccountExpiredPublisher';

interface Payload {
	userId: string;
}

export const expirationQueue = new Queue<Payload>('expiration:user', {
	redis: {
		host: envVars.REDIS_HOST,
	},
});

expirationQueue.process(async (job) => {
	log.info(`User ${job.data.userId} expired, publishing back to auth-svc`);

	new GuestAccountExpiredPublisher(rabbitmqWrapper.connection).publish({
		userId: job.data.userId,
	});
});
