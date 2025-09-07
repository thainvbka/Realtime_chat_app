import Chat from '@/models/chat';
import { Request, Response } from 'express';
import logger from '@/libs/winston';

const createChat = async (req: Request, res: Response) => {
  const { participants, isGroup, chatName } = req.body;
  const userId = req.userId;
  const allParticipants = [...participants, userId];

  try {
    if (!isGroup) {
      if (allParticipants.length !== 2) {
        res
          .status(400)
          .json({ message: 'Private chat must have exactly 2 participants' });
        return;
      }
      let existingChat = await Chat.findOne({
        participants: { $all: allParticipants, $size: 2 },
        isGroup: false,
      });
      if (existingChat) {
        res.status(200).json(existingChat);
        return;
      }
    }

    if (isGroup && !chatName) {
      res.status(400).json({ message: 'Group chat must have a chat name' });
      return;
    }

    const newChatData: any = {
      chatName: isGroup ? chatName : '',
      participants: allParticipants,
      isGroup: isGroup || false,
    };

    const chat = await Chat.create(newChatData);
    const fullChat = await Chat.findById(chat._id)
      .populate('participants', 'username email profilePic')
      .select('chatName groupAvatar')
      .lean()
      .exec();

    //gui sukien socket

    res.status(201).json(fullChat);
  } catch (error) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
    });
    logger.error('Error creating chat: ', error);
  }
};

export default createChat;
