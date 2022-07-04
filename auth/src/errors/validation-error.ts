import { CustomError } from './custom-error';
import { ValidationError } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

export class ValidationException extends CustomError {
	public statusCode: number = StatusCodes.UNPROCESSABLE_ENTITY;

	constructor(private error: ValidationError[]) {
		super('Validation Error');

		Object.setPrototypeOf(this, ValidationException.prototype);
	}

	public serializeError = () => {
		return {
			errors: this.error.map((err) => {
				return {
					message: err.msg,
					field: err.param,
				};
			}),
		};
	};
}
