import { Router } from 'express';
import authController from '../controllers/auth.controller';
import { currentUser } from '../middlewares/current-user';
import { ensureAuthenticated } from '../middlewares/ensure-authenticated';
import { validateRequest } from '../middlewares/validate-request';
import {
	loginValidator,
	signupValidator,
	updateValidator,
} from '../validators/validators';

const router = Router();

router.post('/login', loginValidator, validateRequest, authController.login);
router.post('/signup', signupValidator, validateRequest, authController.signup);
router.post(
	'/signup/visitor',
	signupValidator,
	validateRequest,
	authController.signupVisitor
);
router.get('/me', currentUser, authController.me);
router.get('/logout', authController.logout);

/**
 * Protected routes
 */

router.put(
	'/me',
	currentUser,
	ensureAuthenticated,
	updateValidator,
	validateRequest,
	authController.updateMe
);
router.delete('/me', currentUser, ensureAuthenticated, authController.deleteMe);

export { router as authRouter };
