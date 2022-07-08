import amqp from 'amqplib';
declare class RabbitWrapper {
    private _connection;
    connect: () => Promise<void>;
    get connection(): amqp.Connection;
}
declare const _default: RabbitWrapper;
export default _default;
