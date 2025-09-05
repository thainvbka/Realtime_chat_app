import { Schema, model } from 'mongoose';
import { ref } from 'process';
import { text } from 'stream/consumers';

export interface IMessage {
  chatId: Schema.Types.ObjectId;
  senderId: Schema.Types.ObjectId;
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
