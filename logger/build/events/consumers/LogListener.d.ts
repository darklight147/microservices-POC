import { Listener } from '@quasimodo147/common';
import { ConsumeMessage } from 'amqplib';
export declare class LogListener extends Listener {
    queueName: string;
    private logger;
    onMessage: (payload: ConsumeMessage | null) => Promise<void>;
}
