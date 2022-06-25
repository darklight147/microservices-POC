import { ConsumeMessage, Message } from 'amqplib';
import { expirationQueue } from '../../queues/expiration-queue';
import { ListenerAbstract } from './ListenerAbstract';

interface Event {
	subject: string;
	data: any;
}

export class GuestAccountCreatedListener extends ListenerAbstract<Event> {
	queueName: string = 'expire:guest-user';

	onMessage(msg: ConsumeMessage | null): void {
		const data = JSON.parse(msg?.content.toString() as string);

		expirationQueue
			.add({ userId: data.userId }, { delay: 15 * 60000 })
			.then(() => this.channel.ack(msg as Message));
	}
}
