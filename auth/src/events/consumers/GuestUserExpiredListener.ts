import { GuestQueues } from '@quasimodo147/common';
import { ConsumeMessage, Message } from 'amqplib';
import userService from '../../services/user.service';
import { parseMessage } from '../../utils/parse-message';
import { Listener } from '@quasimodo147/common';

export class GuestUserExpiredListener extends Listener {
	queueName: string = GuestQueues.GUEST_USER_EXPIRED;

	onMessage = async (msg: ConsumeMessage | null) => {
		if (msg) {
			const data = await parseMessage(msg);

			if (data) {
				const user = await userService.findById(data.userId);

				await user.delete();

				this.channel.ack(msg);
				return;
			}

			this.channel.nack(msg, false, false);
			return;
		}
	};
}
