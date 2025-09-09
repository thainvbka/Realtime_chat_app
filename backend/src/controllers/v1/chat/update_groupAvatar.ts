import Chat from '@/models/chat';
import { Request, Response } from 'express';
import logger from '@/libs/winston';
import { v2 as cloudinary } from 'cloudinary';

const updateGroupAvatar = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { chatId } = req.params;
    let { groupAvatar } = req.body;
    const chat = await Chat.findById(chatId);
    if (!chat) {
      res.status(404).json({ message: 'Chat not found' });
      return;
    }
    if (!chat.isGroup) {
      res.status(400).json({ message: 'Not a group chat' });
      return;
    }
    const result = await cloudinary.uploader.upload(groupAvatar, {
      folder: 'group_avatars',
    });
    groupAvatar = result.secure_url;
    chat.groupAvatar = groupAvatar;
    await chat.save();

    res.status(200).json({ message: 'Group avatar updated successfully' });
  } catch (error) {
    res.status(500).json({
      code: 'Server error',
      message: 'Internal server error',
    });
    logger.error('Error in updateGroupAvatar controller:', error);
  }
};

export default updateGroupAvatar;
