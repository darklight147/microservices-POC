import { PublisherAbstract } from './PublisherAbstract';

interface Payload {
	userId: string;
	expiresAt: string;
}

export class GuestUserExpirePublisher extends PublisherAbstract<Payload> {
	queueName: string = 'expire:guest-user';
}
