import { PublisherAbstract } from './PublisherAbstract';

export class GuestUserExpirePublisher extends PublisherAbstract {
	queueName: string = 'expire:guest-user';
}
