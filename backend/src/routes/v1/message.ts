import getMessage from '@/controllers/v1/message/getMessage';
import authenticate from '@/middlewares/authenticate';
import { apiLimiter } from '@/libs/express.rate_limit';
import validationError from '@/middlewares/validationError';
import {
  getMessageValidator,
  sendMessageValidator,
} from '@/validators/message.validator';
import { Router } from 'express';
import sendMessage from '@/controllers/v1/message/sendMessage';

const router = Router();

router.get(
  '/:chatId',
  apiLimiter,
  authenticate,
  getMessageValidator,
  validationError,
  getMessage,
);

router.post(
  '/',
  apiLimiter,
  authenticate,
  sendMessageValidator,
  validationError,
  sendMessage,
);
export default router;
