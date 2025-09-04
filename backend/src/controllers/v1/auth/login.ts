import User, { IUser } from '@/models/user';
import { generateAccessToken, generateRefreshToken } from '@/libs/jwt';
import logger from '@/libs/winston';
import { Request, Response } from 'express';

type UserData = Pick<IUser, 'email' | 'password'>;
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as UserData;
  try {
    const user = await User.findOne({ email })
      .select('username email profilePic')
      .lean()
      .exec();
    if (!user) {
      res.status(404).json({
        code: 'NotFound',
        message: 'User not found',
      });
      return;
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, //Không cho JavaScript phía client truy cập cookie giúp chống XSS(Cross-site scripting).
      sameSite: 'strict', //Cookie chỉ được gửi khi request cùng domain, chống CSRF.
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      user,
      accessToken,
    });
    logger.info('User login success', user);
  } catch (error) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: error,
    });

    logger.error('Error during user login', error);
  }
};

export default login;
