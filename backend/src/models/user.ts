import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
  email: string;
  username: string;
  password: string;
  profilePic?: string;
  status: 'online' | 'offline';
  lastSeen: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: [true, 'Username must be unique'],
      maxLength: [20, 'Username must be less than 20 characters'],
      minLength: [3, 'Username must be at least 3 characters'],
    },
    email: {
      type: String,
      unique: [true, 'Email must be unique'],
      required: [true, 'Email is required'],
      maxLength: [50, 'Email must be less than 50 characters'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [8, 'Password must be at least 8 characters'],
    },
    profilePic: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['online', 'offline'],
      default: 'offline',
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default model('User', userSchema);
