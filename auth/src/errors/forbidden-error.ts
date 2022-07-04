import { StatusCodes } from 'http-status-codes';
import { CustomError } from './custom-error';

export class ForbiddenException extends CustomError {
	public statusCode: number = StatusCodes.FORBIDDEN;

	constructor(private error: string = 'Forbidden') {
		super(error);

		Object.setPrototypeOf(this, ForbiddenException.prototype);
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
