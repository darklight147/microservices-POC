import { body } from "express-validator";

export const loginValidator = [
    body('username').isEmail(),
    body('password').isLength({min: 5})
]

export const signupValidator = [
    body('username').isEmail(),
    body('password').isLength({min: 5})
]