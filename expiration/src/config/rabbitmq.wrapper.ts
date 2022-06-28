import rabbit, { Connection } from 'amqplib';
import { envVars } from './env.config';

class RabbitMQ {
	private _connection!: Connection;

	public async connect() {
		this._connection = await rabbit.connect(`${envVars.RABBIT_URL}`);
	}

	get connection() {
		if (!this._connection) {
			throw new Error('Must initialize connection before that');
		}
		return this._connection;
	}
}

export default new RabbitMQ();
