import { checkVars } from './config/check-vars';
import rabbitWrapper from './config/rabbitWrapper';
import { LogListener } from './events/consumers/LogListener';

async function start() {
	checkVars();

	await rabbitWrapper.connect();

	new LogListener(rabbitWrapper.connection).listen();
}

start();
