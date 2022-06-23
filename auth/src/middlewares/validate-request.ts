import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ValidationException } from "../errors/validation-error";

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new ValidationException(errors.array());
    }

    next();
}