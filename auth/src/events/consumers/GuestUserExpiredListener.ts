import { ConsumeMessage, Message } from 'amqplib';
import userService from '../../services/user.service';
import { parseMessage } from '../../utils/parse-message';
import { ListenerAbstract } from './ListenerAbstract';

export class GuestUserExpiredListener extends ListenerAbstract {
	queueName: string = 'guest-user:expired';

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
