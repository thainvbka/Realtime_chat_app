import { timeStamp } from 'console';
import { Router } from 'express';
import { version } from 'os';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'API is live',
    status: 'ok',
    version: '1.0.0',
    timeStamp: new Date().toISOString(),
  });
});

export default router;
