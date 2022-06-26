import rabbit, { Connection } from 'amqplib';
import { envVars } from './env.config';

class RabbitMqWrapper {
	private _connection!: Connection;

	public async connect() {
		this._connection = await rabbit.connect(`amqp://${envVars.RABBIT_HOST}`);
	}

	get connection() {
		if (!this._connection) {
			throw new Error('Must initialize connection before acceting connection');
		}

		return this._connection;
	}
}

export default new RabbitMqWrapper();
