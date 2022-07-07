import { Publisher, LogQueues } from '@quasimodo147/common';
import rabbitmqWrappers from '../../config/rabbitmq.wrappers';

interface Payload {
	message: string;
	level: string;
	data?: any;
}

class LogPublisher extends Publisher<Payload> {
	queueName = LogQueues.LOG_INFO;

	info(message: string, data?: any) {
		this.publish({
			message,
			level: 'info',
			data,
		});
	}

	error(message: string, data?: any) {
		this.publish({
			message,
			level: 'error',
			data,
		});
	}

	warn(message: string, data?: any) {
		this.publish({
			message,
			level: 'warn',
			data,
		});
	}

	debug(message: string, data?: any) {
		this.publish({
			message,
			level: 'debug',
			data,
		});
	}
}

export default new LogPublisher(rabbitmqWrappers.connection);
