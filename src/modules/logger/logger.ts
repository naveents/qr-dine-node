import winston from 'winston';

interface LoggingInfo {
    level: string;
    message: string | unknown;
}

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.splat(),
        winston.format.printf((info: LoggingInfo) => `${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.Console({
            stderrLevels: ['error'],
        }),
    ],
});

export default logger;