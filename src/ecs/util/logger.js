import {format, createLogger, transports} from 'winston';

const { combine, timestamp, colorize, printf } = format;

const level = process.env.LOG_LEVEL || 'debug';

const myFormat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
	format: combine(colorize(), timestamp(), myFormat),
	transports: [new transports.Console()]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
/*
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: winston.format.simple()
  }));
}
*/
export default logger;