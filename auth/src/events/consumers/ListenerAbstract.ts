import { Channel, Connection, ConsumeMessage } from 'amqplib';

export abstract class Listener {
	abstract queueName: string;
	abstract onMessage: (msg: ConsumeMessage | null) => Promise<void>;
	protected channel!: Channel;

	constructor(private connection: Connection) {}

	public async listen() {
		this.channel = await this.connection.createChannel();

		await this.channel.assertQueue(this.queueName, { durable: true });

		await this.channel.consume(this.queueName, this.onMessage, {
			noAck: false,
		});

		console.log('[+] awaiting RPC Messages');
	}
}
