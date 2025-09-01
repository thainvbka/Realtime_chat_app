import express from 'express';
import config from '@/config';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import v1Router from '@/routes/v1';
import logger from '@/lib/winston';

const app = express();

const allowedOrigins: string[] = ['http://localhost:3000'];
const corsOptions: CorsOptions = {
  origin: function (origin: string | undefined, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Cors not allowed'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('mySecretKey'));
app.use(
  compression({
    threshold: 1024,
  }),
);
app.use(helmet());

app.use('/api/v1', v1Router);

app.listen(config.PORT, () => {
  logger.info(`Server running: http://localhost:${config.PORT}`);
});
