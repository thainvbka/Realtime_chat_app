import logger from '@/libs/winston';
import User from '@/models/user';
import type { Request, Response } from 'express';

const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select(
      '-password -__v -email -createdAt -updatedAt',
    );
    if (!user) {
      res.status(404).json({
        message: 'User not found',
      });
      return;
    }
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: error,
    });
    logger.error('Error fetching user:', error);
  }
};
export default getUser;
