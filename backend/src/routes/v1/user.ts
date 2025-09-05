import authenticate from '@/middlewares/authenticate';
import { Router } from 'express';
import { apiLimiter } from '@/libs/express.rate_limit';
import getInfo from '@/controllers/v1/user/get_info';

const router = Router();

router.get('/me', apiLimiter, authenticate, getInfo);

export default router;
