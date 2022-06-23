import { CustomError } from "./custom-error";
import { ValidationError } from "express-validator";

export class ValidationException extends CustomError {  
    public statusCode: number = 401;

    constructor(private error: ValidationError[]) {
        super("Validation Error");

        Object.setPrototypeOf(this, ValidationException.prototype);
    }

    public serializeError = () => {
        return {
            errors: this.error.map(err => {
                return {
                    message: err.value
                }
            })
        }
    }
}