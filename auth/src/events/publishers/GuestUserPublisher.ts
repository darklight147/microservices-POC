import { ExchangePublisher } from '@quasimodo147/common';
import { GuestQueues } from '@quasimodo147/common';

interface Payload {
	userId: string;
	expiresAt: string;
}

export class GuestUserExpirePublisher extends ExchangePublisher<Payload> {
	queueName: string = GuestQueues.EXPIRE_GUEST_USER;
	exchangeName: string = GuestQueues.EXPIRE_GUEST_USER;
}
