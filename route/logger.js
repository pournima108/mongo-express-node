const winston = require('winston');
const fs = require('fs');

const logDir = 'logs';
const env = process.env.NODE_ENV

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const tsFormat = () => (new Date()).toLocaleTimeString();
var logger = new (winston.createLogger)({
  transports: [
      new (winston.transports.Console)({
          timestamp: tsFormat,
          colorize:true,
          level: env === 'dev' ? 'info' : 'OFF'
      }),
    new (winston.transports.File)({
      name: 'error-file',
      filename: `logs/${logDir}/error.log`,
      level: env === 'production' ? 'error' : 'warn',
      json: false
    })
  ]
});
//logs 
module.exports = logger;
