import { Router } from 'express';
import authenticate from '@/middlewares/authenticate';
import { apiLimiter } from '@/libs/express.rate_limit';
import createChat from '@/controllers/v1/chat/creatChat';
import validationError from '@/middlewares/validationError';
import { createChatValidator } from '@/validators/chat.validator';
import { updateGroupAvatarValidator } from '@/validators/chat.validator';
import updateGroupAvatar from '@/controllers/v1/chat/update_groupAvatar';

const router = Router();

router.post(
  '/create',
  apiLimiter,
  authenticate,
  createChatValidator,
  validationError,
  createChat,
);

router.put(
  '/update/:chatId',
  apiLimiter,
  authenticate,
  updateGroupAvatarValidator,
  validationError,
  updateGroupAvatar,
);

export default router;
