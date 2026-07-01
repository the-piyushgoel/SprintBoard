import { existsSync, mkdirSync } from 'fs';
import winston from 'winston';

const { combine, timestamp, printf, colorize, json } = winston.format;

const logsDir = 'logs';
if (!existsSync(logsDir)) {
  mkdirSync(logsDir, { recursive: true });
}

const consoleFormat = combine(
  colorize(),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  printf(({ level, message, timestamp: ts }) => `${ts} ${level}: ${message}`)
);

const fileFormat = combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), json());

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: fileFormat,
      maxsize: 5242880,
      maxFiles: 5,
    }),
  ],
});

export default logger;
