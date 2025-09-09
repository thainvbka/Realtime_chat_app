import { Socket, Server } from 'socket.io';
import type { Server as HttpServer } from 'http';
import { verifyAccessToken } from '@/libs/jwt';
import Chat from '@/models/chat';
import { Types } from 'mongoose';

let io: Server;

export const setupSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: '*',
      credentials: true,
    },
  });

  io.use((socket, next) => {
    try {
      const auth = socket.handshake.headers.authorization;
      if (!auth) throw new Error('No token provided');
      const [_, token] = auth.split(' ');
      const user = verifyAccessToken(token) as { userId: Types.ObjectId };

      if (!user) throw new Error('Invalid token');

      socket.data.userId = user.userId;

      next();
    } catch (error) {
      return next(new Error('Authentication error'));
    }
  });

  io.on('connection', async (socket: Socket) => {
    const userId = socket.data.userId;

    console.log('A user connected', userId);
    //Server tự truy vấn tất cả các chat mà user này tham gia
    const userChats = await Chat.find({ participants: { $in: [userId] } })
      .select('_id')
      .lean();

    //Cho socket này tham gia vào tất cả các room chat đó
    if (userChats && userChats.length > 0) {
      const chatIds = userChats.map((chat) => chat._id.toString());
      socket.join(chatIds);
      console.log(`User ${userId} automatically joined rooms:`, chatIds);
    }
    // Typing indicators
    socket.on('typing:start', (chatId: string) => {
      socket.to(chatId).emit('typing:start', { chatId, userId });
    });
    socket.on('typing:stop', (chatId: string) => {
      socket.to(chatId).emit('typing:stop', { chatId, userId });
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected', userId);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};
