import {
	GuestQueues,
	Publisher,
	ExpireGuestUserPayload,
} from '@quasimodo147/common';

export class GuestAccountExpiredPublisher extends Publisher<ExpireGuestUserPayload> {
	queueName: string = GuestQueues.GUEST_USER_EXPIRED;
}
