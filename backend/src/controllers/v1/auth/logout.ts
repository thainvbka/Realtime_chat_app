import logger from '@/libs/winston';
import type { Request, Response } from 'express';

const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie('refreshToken', {
      httpOnly: true, //Không cho JavaScript phía client truy cập cookie giúp chống XSS(Cross-site scripting).
      sameSite: 'strict', //Cookie chỉ được gửi khi request cùng domain, chống CSRF.
    });
    res.sendStatus(204);
    logger.info('User loged out successfully', {
      userId: req.userId,
    });
  } catch (error) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: error,
    });
  }
};

export default logout;
