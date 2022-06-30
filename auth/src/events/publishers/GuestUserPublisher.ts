import { Publisher } from './PublisherAbstract';

interface Payload {
	userId: string;
	expiresAt: string;
}

export class GuestUserExpirePublisher extends Publisher<Payload> {
	queueName: string = 'expire:guest-user';
}
