/*import {format, createLogger, transports} from 'winston';
import isA  from 'typeproof/core/isA'

const { combine, timestamp, colorize, printf } = format;

const level = process.env.LOG_LEVEL || 'debug';

const myFormat = printf(({ level, message, label, timestamp }) => {
	return `${level}: ${message}`;
});

const logger = createLogger({
	format: combine(colorize(), timestamp(), myFormat),
	transports: [new transports.Console()]
});

const loggerWrapper = {
  ...logger,
  info: (...msg) => logger.info(run(...msg)),
  debug: (...msg) => logger.debug(run(...msg)),
  warn: (...msg) => logger.warn(run(...msg)),
  error: (...msg) => logger.error(run(...msg))
}

const run = (...msg) => {
  let str = "";
  msg.forEach((o) => {
    console.log("Run", o, isA.object(o))
    if(isA.object(o) || typeof o === 'object') str += JSON.stringify(o) + " ";
    else str += o + " ";
  })
  return str;
}

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
//export default loggerWrapper;