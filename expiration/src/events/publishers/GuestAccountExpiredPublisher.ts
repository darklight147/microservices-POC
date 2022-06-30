import { Publisher } from './PublisherAbstract';

interface Payload {
	userId: string;
}

export class GuestAccountExpiredPublisher extends Publisher<Payload> {
	queueName: string = 'guest-user:expired';
}
