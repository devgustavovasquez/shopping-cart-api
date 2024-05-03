import winston from 'winston';

const { combine, timestamp, json, printf } = winston.format;

export const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    json(),
    printf((info) =>
      JSON.stringify(
        {
          timestamp: info.timestamp,
          level: info.level,
          message: info.message,
        },
        null,
        0,
      ),
    ),
  ),
  transports: [new winston.transports.Console()],
});
