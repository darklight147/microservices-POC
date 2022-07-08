import { LogQueues, Listener } from '@quasimodo147/common';

import pino from 'pino';

import { ConsumeMessage } from 'amqplib';

import { LogQueuePayload } from '@quasimodo147/common';

export class LogListener extends Listener {
	queueName: string = LogQueues.LOG_INFO;

	private logger = pino() as any;

	onMessage = async (payload: ConsumeMessage | null) => {
		if (!payload) return;
		try {
			const { message, level, data } = JSON.parse(
				payload.content.toString()
			) as LogQueuePayload;

			this.logger[level](message, data);
		} catch (error) {
			console.log(payload.content.toString());
		}

		this.channel.ack(payload);
	};
}
