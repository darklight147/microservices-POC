import { StatusCodes } from 'http-status-codes';
import { CustomError } from './custom-error';

export class BadRequestException extends CustomError {
	public statusCode: number = StatusCodes.BAD_REQUEST;

	constructor(private error: string = 'Bad Request') {
		super(error);

		Object.setPrototypeOf(this, BadRequestException.prototype);
	}

	public serializeError = () => {
		return {
			errors: [
				{
					message: this.error,
				},
			],
		};
	};
}
