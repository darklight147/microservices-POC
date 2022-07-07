import rabbitWrapper from './config/rabbitWrapper';
import { LogListener } from './events/consumers/LogListener';

async function start() {
	new LogListener(rabbitWrapper.connection).listen();
}

start();
