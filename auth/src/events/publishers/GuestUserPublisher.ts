import { ExchangePublisher } from './ExchangePublisherAbstract';
import { Publisher } from './PublisherAbstract';

interface Payload {
	userId: string;
	expiresAt: string;
}

export class GuestUserExpirePublisher extends ExchangePublisher<Payload> {
	queueName: string = 'expire:guest-user';
	exchangeName: string = 'expire:guest-user';
}
