import Chat from '@/models/chat';
import Message from '@/models/message';
import logger from '@/libs/winston';
import type { Request, Response } from 'express';

const getMessage = async (req: Request, res: Response) => {
  try {
    const chatId = req.params.chatId;
    const limit = parseInt(req.query.limit as string) || 20;
    const page = parseInt(req.query.page as string) || 1;
    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      Message.find({ chatId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('senderId', 'username profilePic')
        .lean()
        .exec(),
      Message.countDocuments({ chatId }),
    ]);

    res.status(200).json({
      messages: messages.reverse(),
      pagination: {
        total,
        page,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
    });
    logger.error('Error fetching messages', error);
  }
};

export default getMessage;
