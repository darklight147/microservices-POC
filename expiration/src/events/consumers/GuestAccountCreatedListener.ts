import {
	ExpireGuestUserPayload,
	GuestQueues,
	Listener,
	log,
} from '@quasimodo147/common';
import { ConsumeMessage, Message } from 'amqplib';
import { expirationQueue } from '../../queues/expiration-queue';

export class GuestAccountCreatedListener extends Listener {
	queueName: string = GuestQueues.EXPIRE_GUEST_USER;

	onMessage = async (msg: ConsumeMessage | null) => {
		try {
			const data = JSON.parse(
				msg?.content.toString() as string
			) as ExpireGuestUserPayload;

			try {
				await expirationQueue.add(
					{ userId: data.userId },
					{ delay: new Date(data.expiresAt).getTime() - Date.now() }
				);

				this.channel.ack(msg as Message);

				log.info(
					`Expiring guest user ${data.userId} in ${
						(new Date(data.expiresAt).getTime() - Date.now()) / 1000
					} s`
				);
			} catch (error: any) {
				console.log(error.message);
				log.error(error.message);
				this.channel.nack(msg as Message, false, true);
			}
		} catch (error: any) {
			console.log(error.message);
			log.error(error.message);
			this.channel.nack(msg as Message, false, false);
		}
	};
}
