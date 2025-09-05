import authenticate from '@/middlewares/authenticate';
import { Router } from 'express';
import { apiLimiter } from '@/libs/express.rate_limit';
import getInfo from '@/controllers/v1/user/get_info';
import searchUser from '@/controllers/v1/user/search_user';
import contact from '@/controllers/v1/user/get_contact';

const router = Router();

router.get('/me', apiLimiter, authenticate, getInfo);
router.get('/search', apiLimiter, authenticate, searchUser);
router.get('/contact', apiLimiter, authenticate, contact);
export default router;
