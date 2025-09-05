import { Schema, model } from 'mongoose';
export interface IChat {
  particials: Schema.Types.ObjectId[];
  isGroup: boolean;
  chatName?: string;
  groupAvatar?: string;
  lastMessage?: Schema.Types.ObjectId;
}
const chatSchema = new Schema(
  {
    particials: [
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
