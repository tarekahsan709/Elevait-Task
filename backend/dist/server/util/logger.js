"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston = require("winston");
const options = {
    transports: [
        new winston.transports.Console({
            level: process.env.NODE_ENV === 'production' ? 'error' : 'debug'
        })
        // new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
    ]
};
const logger = winston.createLogger(options);
exports.logger = logger;
if (process.env.NODE_ENV !== 'production') {
    logger.debug('Logging initialized at debug level');
}
//# sourceMappingURL=logger.js.map