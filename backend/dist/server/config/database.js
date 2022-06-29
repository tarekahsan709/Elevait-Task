"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Db = void 0;
const tslib_1 = require("tslib");
const mongoose = require("mongoose");
const logger_1 = require("../util/logger");
const secrets_1 = require("./secrets");
class Db {
    static getUri() {
        if (process.env.NODE_ENV === secrets_1.Environment.Test) {
            return secrets_1.MONGODB_TEST_URI;
        }
        else {
            return secrets_1.MONGODB_URI;
        }
    }
    /**
     * Connect with the database
     */
    connect() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            mongoose.connect(Db.getUri(), err => {
                if (err) {
                    logger_1.logger.error('mongoose connecting failed: ', err);
                }
            });
            mongoose.connection.on('error', (err) => {
                logger_1.logger.error('Error connecting to MongoDB: ', err);
            });
            mongoose.connection.once('open', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (process.env.NODE_ENV !== secrets_1.Environment.Test) {
                    logger_1.logger.info('Database has connected');
                }
                else {
                    logger_1.logger.info('Test Database has connected');
                }
            }));
        });
    }
    /**
     * Disconnect with the database
     */
    disconnect() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            mongoose.connection.close(() => {
                logger_1.logger.info('Mongoose default connection disconnected through app termination');
                process.exit(0);
            });
        });
    }
}
exports.Db = Db;
//# sourceMappingURL=database.js.map