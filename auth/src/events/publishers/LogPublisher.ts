import { LogQueues, Publisher } from '@quasimodo147/common';

interface Payload {
	message: string;
	level: string;
	data?: any;
}

export class LogPublisher extends Publisher<Payload> {
	queueName = LogQueues.LOG_INFO;
}
