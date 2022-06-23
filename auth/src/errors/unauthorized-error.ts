import { CustomError } from "./custom-error";
import { ValidationError } from "express-validator";

export class UnauthorizedException extends CustomError {
  public statusCode: number = 401;

  constructor(private error: string = "Unauhthorized") {
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
