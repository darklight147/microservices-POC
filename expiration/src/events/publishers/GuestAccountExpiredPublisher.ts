import { PublisherAbstract } from './PublisherAbstract';

export class GuestAccountExpiredPublisher extends PublisherAbstract<any> {
	queueName: string = 'guest-user:expired';
}
