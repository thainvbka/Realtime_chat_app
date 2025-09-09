import { Schema, model, Types } from 'mongoose';

export interface IMessage {
  chatId: Types.ObjectId;
  senderId: Types.ObjectId;
  text?: string;
  image?: string;
  isRead: boolean;
  seenAt?: Date | null;
}

const messageSchema = new Schema(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    seenAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);
const Message = model<IMessage>('Message', messageSchema);
export default Message;
