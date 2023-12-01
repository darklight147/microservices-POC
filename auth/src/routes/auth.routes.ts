import { Router } from 'express';
import authController from '../controllers/auth.controller';
import {
	loginValidator,
	signupValidator,
	updateValidator,
} from '../validators/validators';
import { validateRequest, ensureAuthenticated } from '@quasimodo147/common';

const router = Router();

router.post('/login', loginValidator, validateRequest, authController.login);
router.post('/signup', signupValidator, validateRequest, authController.signup);
router.post('/signup/visitor', authController.signupVisitor);
router.get('/me', authController.me);
router.get('/logout', authController.logout);

/**
 * Protected routes
 */

router.put(
	'/me',
	ensureAuthenticated,
	updateValidator,
	validateRequest,
	authController.updateMe,
);
router.delete('/me', ensureAuthenticated, authController.deleteMe);

export { router as authRouter };
