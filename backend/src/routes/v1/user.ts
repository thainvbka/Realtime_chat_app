import authenticate from '@/middlewares/authenticate';
import { Router } from 'express';
import { apiLimiter } from '@/libs/express.rate_limit';
import getInfo from '@/controllers/v1/user/get_info';
import searchUser from '@/controllers/v1/user/search_user';
import contact from '@/controllers/v1/user/get_contact';
import getUser from '@/controllers/v1/user/get_user';
import updateProfilePic from '@/controllers/v1/user/update_profilePic';
import validationError from '@/middlewares/validationError';
import {
  userProfileUpdateValidator,
  getUserValidator,
  searchUserValidator,
} from '@/validators/user.validator';

const router = Router();

router.get('/me', apiLimiter, authenticate, getInfo);
router.get(
  '/search',
  apiLimiter,
  authenticate,
  searchUserValidator,
  validationError,
  searchUser,
);
router.get('/contact', apiLimiter, authenticate, contact);
router.put(
  '/update',
  apiLimiter,
  userProfileUpdateValidator,
  validationError,
  authenticate,
  updateProfilePic,
);
router.get(
  '/:id',
  apiLimiter,
  authenticate,
  getUserValidator,
  validationError,
  getUser,
);
export default router;
