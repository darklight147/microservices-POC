import { ErrorRequestHandler } from 'express';
import { CustomError } from '../errors/custom-error';
import { StatusCodes } from 'http-status-codes';

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
	if (error instanceof CustomError) {
		res.status(error.statusCode).json(error.serializeError());
	} else {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			errors: [
				{
					message: 'Something happened',
				},
			],
		});

		console.log(error.message);
	}
};
