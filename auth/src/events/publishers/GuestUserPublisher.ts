import {
	ExchangePublisher,
	GuestQueues,
	ExpireGuestUserPayload,
} from '@quasimodo147/common';

export class GuestUserExpirePublisher extends ExchangePublisher<ExpireGuestUserPayload> {
	queueName: string = GuestQueues.EXPIRE_GUEST_USER;
	exchangeName: string = GuestQueues.EXPIRE_GUEST_USER;
}
