import { ErrorRequestHandler } from 'express';
import { CustomError, log } from '@quasimodo147/common';
import { StatusCodes } from 'http-status-codes';

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
	if (error instanceof CustomError)
		res.status(error.statusCode).json(error.serializeError());
	else {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			errors: [
				{
					message: 'Something happened',
				},
			],
		});

		console.log(error.message);
		log.error(error.message);
	}
};
