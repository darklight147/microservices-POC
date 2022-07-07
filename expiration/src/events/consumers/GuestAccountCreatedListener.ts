import { ConsumeMessage, Message } from 'amqplib';
import { expirationQueue } from '../../queues/expiration-queue';
import { Listener, GuestQueues } from '@quasimodo147/common';

interface Payload {
	userId: string;
	expiresAt: string;
}

export class GuestAccountCreatedListener extends Listener {
	queueName: string = GuestQueues.EXPIRE_GUEST_USER;

	onMessage = async (msg: ConsumeMessage | null) => {
		try {
			const data = JSON.parse(msg?.content.toString() as string) as Payload;

			try {
				await expirationQueue.add(
					{ userId: data.userId },
					{ delay: new Date(data.expiresAt).getTime() - Date.now() }
				);

				this.channel.ack(msg as Message);
			} catch (error: any) {
				console.log(error.message);
				this.channel.nack(msg as Message, false, true);
			}
		} catch (error: any) {
			console.log(error.message);
			this.channel.nack(msg as Message, false, false);
		}
	};
}
