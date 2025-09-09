import { Router } from 'express';
import authRoutes from '@/routes/v1/auth';
import userRoutes from '@/routes/v1/user';
import chatRoutes from '@/routes/v1/chat';
import messageRoutes from '@/routes/v1/message';
const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'API is live',
    status: 'ok',
    version: '1.0.0',
    timeStamp: new Date().toISOString(),
  });
});

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/chat', chatRoutes);
router.use('/message', messageRoutes);

export default router;
