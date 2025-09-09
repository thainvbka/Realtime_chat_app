import Chat from '@/models/chat';
import Message, { IMessage } from '@/models/message';
import { v2 as cloudinary } from 'cloudinary';
import logger from '@/libs/winston';
import type { Request, Response } from 'express';
import { getIO } from '@/libs/socket';

type messageData = Pick<IMessage, 'chatId' | 'text' | 'image'>;
const sendMessage = async (req: Request, res: Response) => {
  try {
    const { chatId, text, image } = req.body as messageData;
    let imageUrl = image;
    if (!text && !image) {
      return res.status(400).json({
        code: 'InvalidInput',
        message: 'Either text or image must be provided',
      });
    }
    if (image) {
      const result = await cloudinary.uploader.upload(image, {
        folder: 'chat_images',
      });
      imageUrl = result.secure_url;
    }
    const message = new Message({
      chatId,
      senderId: req.userId,
      text,
      image: imageUrl,
    });
    await message.save();

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({
        code: 'NotFound',
        message: 'Chat not found',
      });
    }

    chat.lastMessage = message._id;
    await chat.save();

    const fullMessage = await Message.findById(message._id).populate(
      'senderId',
      'username profilePic',
    );
    // Emit đến room chatId
    if (fullMessage)
      getIO().to(chatId.toString()).emit('message:new', fullMessage);

    res.status(201).json({
      code: 'Success',
      message: 'Message sent successfully',
      data: fullMessage,
    });
  } catch (error) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
    });
    logger.error('Error in sendMessage controller: ', error);
  }
};

export default sendMessage;
