import register from '@/controllers/v1/auth/register';
import { authLimiter } from '@/libs/express.rate_limit';
import validationError from '@/middlewares/validationError';
import { registerValidator } from '@/validators/auth.validator';
import { Router } from 'express';

const router = Router();

router.post(
  '/register',
  authLimiter,
  ...registerValidator,
  validationError,
  register,
);

export default router;
