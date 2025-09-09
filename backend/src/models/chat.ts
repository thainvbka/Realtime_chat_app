import { Schema, model, Types } from 'mongoose';
export interface IChat {
  participants: Types.ObjectId[];
  isGroup: boolean;
  chatName?: string;
  groupAvatar?: string;
  lastMessage?: Types.ObjectId;
}
const chatSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    isGroup: {
      type: Boolean,
      default: false,
    },
    chatName: {
      type: String,
      maxLength: [20, 'Chat name must be less than 20 characters'],
      default: '',
    },
    groupAvatar: {
      type: String,
      default: '',
    },
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  },
  { timestamps: true },
);

const Chat = model<IChat>('Chat', chatSchema);
export default Chat;
