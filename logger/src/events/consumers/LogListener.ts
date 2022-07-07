import { LogQueues, Listener } from '@quasimodo147/common';

import pino from 'pino';

interface Payload {
	message: string;
	level: string;
	data?: any;
}

export class LogListener extends Listener {
	queueName: string = LogQueues.LOG_INFO;

	private logger = pino() as any;

	onMessage = async (payload: Payload) => {
		this.logger[payload.level](payload.message, payload.data);
	};
}
