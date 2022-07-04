import { CustomError } from './custom-error';
import { ValidationError } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

export class NotFoundException extends CustomError {
	public statusCode: number = StatusCodes.NOT_FOUND;

	constructor(private error: string = 'Not Found Error') {
		super(error);

		Object.setPrototypeOf(this, NotFoundException.prototype);
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
