import { GuestQueues, Publisher } from '@quasimodo147/common';

interface Payload {
	userId: string;
}

export class GuestAccountExpiredPublisher extends Publisher<Payload> {
	queueName: string = GuestQueues.GUEST_USER_EXPIRED;
}
