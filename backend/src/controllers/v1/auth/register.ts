import User, { IUser } from '@/models/user';
import { generateAccessToken, generateRefreshToken } from '@/libs/jwt';
import logger from '@/libs/winston';
import type { Request, Response } from 'express';

type UserData = Pick<IUser, 'username' | 'email' | 'password' | 'profilePic'>;

const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password, profilePic }: UserData = req.body;
  try {
    const newUser = await User.create({
      username,
      email,
      password,
      profilePic,
    });

    const accessToken = generateAccessToken(newUser._id);
    const refreshToken = generateRefreshToken(newUser._id);

    //gửi Refresh Token về client thông qua cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, //Không cho JavaScript phía client truy cập cookie giúp chống XSS(Cross-site scripting).
      sameSite: 'strict', //Cookie chỉ được gửi khi request cùng domain, chống CSRF.
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      user: {
        username,
        email,
      },
      accessToken,
    });

    logger.info('User registered successfully', {
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: error,
    });
    logger.error('Error during user registration', error);
  }
};
export default register;
