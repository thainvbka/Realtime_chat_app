import User, { IUser } from '@/models/user';
import cloudinary from '@/libs/cloudinary';
import logger from '@/libs/winston';
import type { Request, Response } from 'express';

type UserProfileUpdate = Pick<IUser, 'profilePic'>;

const updateProfilePic = async (req: Request, res: Response): Promise<void> => {
  const { profilePic } = req.body as UserProfileUpdate;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).json({
        message: 'User not found',
      });
      return;
    }

    if (profilePic) {
      const result = await cloudinary.uploader.upload(profilePic, {
        folder: 'profile_pics',
      });
      user.profilePic = result.secure_url;
    }

    await user.save();
    res.status(200).json({
      message: 'Profile updated successfully',
    });
  } catch (error) {
    logger.error('Error updating profile:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export default updateProfilePic;
