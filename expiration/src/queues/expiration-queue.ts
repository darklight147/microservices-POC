import Queue from 'bull';
import { envVars } from '../config/env.config';

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
});
