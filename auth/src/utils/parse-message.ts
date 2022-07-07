import { ConsumeMessage } from 'amqplib';

export const parseMessage = async (
	msg: ConsumeMessage,
): Promise<any | null> => {
	try {
		return JSON.parse(msg.content.toString());
	} catch (error: any) {
		return null;
	}
};
