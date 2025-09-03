import { createLogger, format, transports } from 'winston';
const { combine, timestamp, colorize, printf, align, label } = format;
import config from '@/config';

const myFormat = printf(({ level, message, label, timestamp, ...rest }) => {
  const meta = Object.keys(rest).length ? ' ' + JSON.stringify(rest) : ' ';
  return `${timestamp} [${label}] ${level}: ${message}${meta}`;
});

const logger = createLogger({
  level: config.LOG_LEVEL || 'info',
  format: combine(
    colorize(),
    label({ label: 'CHAT_APP' }),
    timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }),
    align(),
    myFormat,
  ),
  transports: [new transports.Console()],
});

export default logger;
