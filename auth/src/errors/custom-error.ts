export abstract class CustomError extends Error {
    abstract statusCode: number;
    abstract serializeError: () => {errors: {message: string, field?: string}[]}
}