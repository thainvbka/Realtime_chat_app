import User from '@/models/user';
import logger from '@/libs/winston';
import type { Request, Response } from 'express';

const getInfo = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId)
      .select('-__v -password')
      .lean()
      .exec();

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: error,
    });

    logger.error('Error while getting info', error);
  }
};

export default getInfo;
