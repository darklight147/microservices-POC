import { body } from 'express-validator';

export const loginValidator = [
	body('username').isEmail().normalizeEmail().trim(),
	body('password').isLength({ min: 5 }).trim(),
];

export const signupValidator = [
	body('username').isEmail().isEmail().normalizeEmail().trim(),
	body('password').isLength({ min: 5 }).trim(),
];

export const updateValidator = [
	body('username').isEmail().normalizeEmail().trim(),
	body('password').isLength({ min: 5 }).trim(),
];
