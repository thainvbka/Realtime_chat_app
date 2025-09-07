import { body, param } from 'express-validator';
import User from '@/models/user';

export const createChatValidator = [
  body('participants')
    .isArray()
    .withMessage('Participants must be an array')
    .custom(async (participants) => {
      if (participants.length === 0) {
        throw new Error('Participants array must not be empty');
      }
      const users = await User.find({ _id: { $in: participants } });
      if (users.length !== participants.length) {
        throw new Error('One or more participants do not exist');
      }
      return true;
    }),
  body('isGroup')
    .optional()
    .isBoolean()
    .withMessage('isGroup must be a boolean'),
  body('chatName')
    .if((value, { req }) => req.body.isGroup === true) // Only validate chatName if isGroup is true
    .isString()
    .withMessage('chatName must be a string')
    .isLength({ max: 20 })
    .withMessage('chatName must be at less than 20 characters'),
];

export const updateGroupAvatarValidator = [
  param('chatId').isMongoId().withMessage('Invalid chat ID'),
  body('groupAvatar').notEmpty().withMessage('Group avatar is required'),
];
