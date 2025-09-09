import { body, query, param } from 'express-validator';
import Chat from '@/models/chat';

export const getMessageValidator = [
  param('chatId')
    .isMongoId()
    .withMessage('Invalid chatId')
    .custom(async (value, { req }) => {
      const userId = req.userId;

      if (!userId) {
        throw new Error('Unauthorized');
      }
      const chat = await Chat.findById(value).select('participants');

      if (!chat) {
        throw new Error('Chat not found');
      }

      if (
        !chat.participants.some((id) => id.toString() === userId.toString())
      ) {
        throw new Error('You are not a participant of this chat');
      }
    }),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be an integer between 1 and 100'),
  query('page')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Page must be a non-negative integer'),
];

export const sendMessageValidator = [
  body('chatId')
    .isMongoId()
    .withMessage('Invalid chatId')
    .custom(async (value, { req }) => {
      const userId = req.userId;

      if (!userId) {
        throw new Error('Unauthorized');
      }
      const chat = await Chat.findById(value).select('participants');

      if (!chat) {
        throw new Error('Chat not found');
      }

      if (
        !chat.participants.some((id) => id.toString() === userId.toString())
      ) {
        throw new Error('You are not a participant of this chat');
      }
    }),
  body('text')
    .optional()
    .isString()
    .isLength({ max: 1000 })
    .withMessage('Text must be at most 1000 characters long'),
  body('image').optional(),
];
