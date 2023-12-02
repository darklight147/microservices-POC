import winston from 'winston';
import { SeqTransport } from '@datalust/winston-seq';

const logger = winston.createLogger({
	transports: [
		new SeqTransport({
			serverUrl: process.env.SEQ_URL ?? 'http://localhost:5341',
			onError: (e) => {
				console.error(e);
			},
		}),
	],
});

export { logger };
