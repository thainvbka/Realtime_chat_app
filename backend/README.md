# Realtime Chat App – Backend

Backend Node.js/TypeScript cho ứng dụng chat thời gian thực.

## Bắt đầu

1. Cài đặt phụ thuộc

```
npm install
```

2. Cấu hình biến môi trường (tạo file `.env` trong thư mục `backend/`)

```
PORT=3000
LOG_LEVEL=info
MONGO_URI=mongodb://localhost:27017
DB_NAME=realtime_chat
JWT_ACCESS_SECRET=your_access_secret
ACCESS_TOKEN_EXPIRY=15m
JWT_REFRESH_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRY=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

3. Chạy môi trường phát triển

```
npm run dev
```

Server khởi chạy tại http://localhost:3000 và khởi tạo Socket.IO trên cùng HTTP server.
