import rabbitmqWrappers from '../config/rabbitmq.wrappers';
import { LogPublisher } from '../events/publishers/LogPublisher';

export class Logger {
	private _logger!: LogPublisher;

	init() {
		this._logger = new LogPublisher(rabbitmqWrappers.connection);
	}

	info(message: string, data?: any) {
		this._logger.publish({
			message,
			level: 'info',
			data,
		});
	}

	error(message: string, data?: any) {
		this._logger.publish({
			message,
			level: 'error',
			data,
		});
	}

	warn(message: string, data?: any) {
		this._logger.publish({
			message,
			level: 'warn',
			data,
		});
	}

	debug(message: string, data?: any) {
		this._logger.publish({
			message,
			level: 'debug',
			data,
		});
	}
}

export default new Logger();
