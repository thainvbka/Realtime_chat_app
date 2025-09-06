import { body } from 'express-validator';

export const userProfileUpdateValidator = [
  body('profilePic').notEmpty().withMessage('Profile picture is required'),
];
