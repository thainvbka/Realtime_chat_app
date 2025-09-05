import register from '@/controllers/v1/auth/register';
import authenticate from '@/middlewares/authenticate';
import { authLimiter } from '@/libs/express.rate_limit';
import validationError from '@/middlewares/validationError';
import { registerValidator } from '@/validators/auth.validator';
import { loginValidator } from '@/validators/auth.validator';
import login from '@/controllers/v1/auth/login';
import logout from '@/controllers/v1/auth/logout';

import { Router } from 'express';

const router = Router();

router.post(
  '/register',
  authLimiter,
  ...registerValidator,
  validationError,
  register,
);

router.post('/login', authLimiter, ...loginValidator, validationError, login);
router.post('/logout', authLimiter, authenticate, logout);

export default router;
