import { LogQueues, Publisher, LogQueuePayload } from '@quasimodo147/common';

export class LogPublisher extends Publisher<LogQueuePayload> {
	queueName = LogQueues.LOG_INFO;
}
