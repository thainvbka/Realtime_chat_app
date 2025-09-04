import { body } from 'express-validator';
import User from '@/models/user';
import bcrypt from 'bcrypt';

export const registerValidator = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .matches(/^\S+$/)
    .withMessage('Username must not contain whitespace')
    .isLength({ max: 20, min: 3 })
    .withMessage('Username must be between 3 and 20 characters')
    .custom(async (value) => {
      const existsUsername = await User.exists({ username: value });
      if (existsUsername) {
        throw new Error('Username already in use');
      }
    }),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isLength({ max: 50 })
    .withMessage('Email must be less than 50 characters ')
    .isEmail()
    .withMessage('Invalid is email')
    .custom(async (value) => {
      const existsEmail = await User.exists({ email: value });
      if (existsEmail) {
        throw new Error('Email already in use');
      }
    }),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .matches(/^\S+$/)
    .withMessage('Password must not contain whitespace')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  body('profilePic').optional(),
];

export const loginValidator = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isLength({ max: 50 })
    .withMessage('Email must be less than 50 characters ')
    .isEmail()
    .withMessage('Invalid is email')
    .custom(async (value) => {
      const existsEmail = await User.exists({ email: value });
      if (!existsEmail) {
        throw new Error('Invalid email address');
      }
    }),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: req.body.email })
        .select('password')
        .lean()
        .exec();

      if (!user) {
        throw new Error('User email is invalid');
      }

      const checkPw = await bcrypt.compare(value, user.password);
      if (!checkPw) {
        throw new Error('User password is invalid');
      }
    }),
];
