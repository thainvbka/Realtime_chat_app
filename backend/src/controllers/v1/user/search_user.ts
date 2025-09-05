import logger from '@/libs/winston';
import User from '@/models/user';
import type { Request, Response } from 'express';

const searchUser = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    if (!search || typeof search !== 'string') {
      return res.status(400).json({
        code: 'InvalidParameter',
        message: 'Search parameter is required and must be a string',
      });
    }
    const user = await User.findOne({ username: search.toString().trim() })
      .select('-__v -password')
      .exec();
    if (!user) {
      return res.status(404).json({
        code: 'UserNotFound',
        message: 'User not found',
      });
    }
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal Server Error',
    });
    logger.error('Error in search user: ', error);
  }
};

export default searchUser;
