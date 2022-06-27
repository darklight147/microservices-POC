import { ConsumeMessage, Message } from 'amqplib';
import { expirationQueue } from '../../queues/expiration-queue';
import { ListenerAbstract } from './ListenerAbstract';

interface Payload {
	userId: string;
	delay: number;
}

export class GuestAccountCreatedListener extends ListenerAbstract {
	queueName: string = 'expire:guest-user';

	onMessage = async (msg: ConsumeMessage | null) => {
		try {
			const data = JSON.parse(msg?.content.toString() as string) as Payload;

			try {
				await expirationQueue.add(
					{ userId: data.userId },
					{ delay: data.delay * 60000 }
				);

				this.channel.ack(msg as Message);
			} catch (error) {
				this.channel.nack(msg as Message, false, true);
			}
		} catch (error: any) {
			this.channel.nack(msg as Message, false, false);
		}
	};
}
