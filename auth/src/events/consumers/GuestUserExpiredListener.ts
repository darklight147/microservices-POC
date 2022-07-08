import { GuestQueues } from '@quasimodo147/common';
import { ConsumeMessage, Message } from 'amqplib';
import userService from '../../services/user.service';
import { parseMessage } from '../../utils/parse-message';
import { Listener } from '@quasimodo147/common';
import log from '../../utils/logger';

export class GuestUserExpiredListener extends Listener {
	queueName: string = GuestQueues.GUEST_USER_EXPIRED;

	onMessage = async (msg: ConsumeMessage | null) => {
		if (!msg) return;

		const data = await parseMessage(msg);

		if (data) {
			const user = await userService.findById(data.userId);

			if (!user) this.channel.ack(msg);

			await user.remove();

			this.channel.ack(msg);

			log.info(`Guest user ${user.id} expired and removed from db`);
		} else {
			this.channel.nack(msg, false, false);
		}
	};
}
