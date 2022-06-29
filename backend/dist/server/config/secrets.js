"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.MONGODB_TEST_URI = exports.MONGODB_URI = exports.ENVIRONMENT = exports.Environment = void 0;
const dotenv = require("dotenv");
const fs = require("fs");
const logger_1 = require("../util/logger");
var Environment;
(function (Environment) {
    Environment["Production"] = "PRODUCTION";
    Environment["Development"] = "DEVELOPMENT";
    Environment["Test"] = "TEST";
})(Environment = exports.Environment || (exports.Environment = {}));
/**
 * Loading environment file
 */
if (fs.existsSync('.env')) {
    dotenv.config({ path: '.env' });
    logger_1.logger.debug('Using .env file to supply config environment variables');
}
else {
    dotenv.config({ path: '.env.example' });
    logger_1.logger.debug('Using .env.example file to supply config environment variables');
}
exports.ENVIRONMENT = process.env.NODE_ENV;
const isProductionEnv = exports.ENVIRONMENT === Environment.Production;
/**
 * Assigning environment variables
 */
exports.MONGODB_URI = isProductionEnv
    ? process.env.MONGODB_URI
    : process.env.MONGODB_URI_LOCAL;
exports.MONGODB_TEST_URI = process.env.MONGODB_TEST_URI;
exports.JWT_SECRET = process.env.JWT_SECRET;
/**
 * Checking environment variables
 */
if (!exports.JWT_SECRET) {
    logger_1.logger.error('No jwt secret. Set JWT_SECRET environment variable.');
    process.exit(1);
}
if (!exports.MONGODB_URI) {
    if (isProductionEnv) {
        logger_1.logger.error('No mongo connection string. Set MONGODB_URI environment variable.');
    }
    else {
        logger_1.logger.error('No mongo connection string. Set MONGODB_URI_LOCAL environment variable.');
    }
    process.exit(1);
}
if (!exports.MONGODB_TEST_URI) {
    logger_1.logger.error('No mongo test connection string. Set MONGODB_TEST_URI environment variable.');
    process.exit(1);
}
//# sourceMappingURL=secrets.js.map