import amqp, { Connection } from 'amqplib';

class RabbitWrapper {
	private _connection!: Connection;

	connect = async () => {
		this._connection = await amqp.connect(process.env.RABBIT_URL!);
	};

	get connection() {
		return this._connection;
	}
}

export default new RabbitWrapper();
