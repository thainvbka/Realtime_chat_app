import Chat from '@/models/chat';
import { Request, Response } from 'express';
import logger from '@/libs/winston';

const getChat = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const allChat = await Chat.find({ participants: { $in: [userId] } })
      .select('isGroup chatName groupAvatar')
      .populate('participants', 'username profilePic');

    res.status(200).json({ chats: allChat });
  } catch (error) {
    res.status(500).json({
      code: 'Server error',
      message: 'Internal server error',
    });
    logger.error('Error in getChat controller:', error);
  }
};

export default getChat;
