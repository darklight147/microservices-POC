import { CustomError } from './custom-error';
import { ValidationError } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

export class UnauthorizedException extends CustomError {
	public statusCode: number = StatusCodes.UNAUTHORIZED;

	constructor(private error: string = 'Unauhthorized') {
		super(error);

		Object.setPrototypeOf(this, UnauthorizedException.prototype);
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
