import { body, param, query } from 'express-validator';

export const userProfileUpdateValidator = [
  body('profilePic').notEmpty().withMessage('Profile picture is required'),
];

export const getUserValidator = [
  param('id').isMongoId().withMessage('Invalid user ID'),
];

export const searchUserValidator = [
  query('search')
    .trim()
    .notEmpty()
    .withMessage('Search query must not be empty')
    .isString()
    .withMessage('Search query must be a string'),
];
