import { Publisher } from './PublisherAbstract';

export abstract class ExchangePublisher<T> extends Publisher<T> {
	abstract exchangeName: string;

	public async publish(data: T): Promise<void> {
		this.channel = await this.connection.createChannel();

		const { exchange } = await this.channel.assertExchange(
			this.exchangeName,
			'fanout',
			{
				durable: true,
			}
		);

		await this.channel.assertQueue(this.queueName, { durable: true });

		await this.channel.bindQueue(this.queueName, exchange, '');

		this.channel.publish(exchange, '', Buffer.from(JSON.stringify(data)));

		console.log('Published to Fanout exchange expiration event');
	}
}
