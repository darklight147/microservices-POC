import { ErrorRequestHandler } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler: ErrorRequestHandler  = (error, req, res, next) => {
    if (error instanceof CustomError) {
        res.status(error.statusCode).json(error.serializeError());
    }

    else {
        res.status(500).json({
            errors: [{
                message: "Something happened"
            }]
        });

        console.log(error.message);
    }
}