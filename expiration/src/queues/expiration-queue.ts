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
	console.log('processing expiration queue');

	new GuestAccountExpiredPublisher(rabbitmqWrapper.connection).publish({
		userId: job.data.userId,
	});
});
