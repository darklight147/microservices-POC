import { CustomError } from "./custom-error";
import { ValidationError } from "express-validator";

export class NotFoundException extends CustomError {  
    public statusCode: number = 404;

    constructor(private error: string = "Not Found Error") {
        super(error);

        Object.setPrototypeOf(this, NotFoundException.prototype);
    }

    public serializeError = () => {
        return {
            errors: [
                {
                    message: this.error
                }
            ]
        }
    }
}