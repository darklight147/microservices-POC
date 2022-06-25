import { ConsumeMessage, Message } from 'amqplib';
import { expirationQueue } from '../../queues/expiration-queue';
import { ListenerAbstract } from './ListenerAbstract';

interface Payload {
	userId: string;
}

export class GuestAccountCreatedListener extends ListenerAbstract {
	queueName: string = 'expire:guest-user';

	onMessage(msg: ConsumeMessage | null): void {
		try {
			const data = JSON.parse(msg?.content.toString() as string) as Payload;

			expirationQueue
				.add({ userId: data.userId }, { delay: 15 * 60000 })
				.then(() => this.channel.ack(msg as Message));
		} catch (error: any) {
			this.channel.nack(msg as Message, false, false);
		}
	}
}
