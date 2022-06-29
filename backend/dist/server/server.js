"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const helmet_1 = require("helmet");
const db = require("./config/database");
const secrets_1 = require("./config/secrets");
const logger_1 = require("./util/logger");
const documentRoutes_1 = require("./routes/documentRoutes");
const pageRoutes_1 = require("./routes/pageRoutes");
const RateLimiter_1 = require("./util/RateLimiter");
const API_BASE_URL = '/api/v1/';
class Server {
    constructor() {
        this.app = express();
        this.db = new db.Db();
        dotenv.config();
        this.initApp();
    }
    start() {
        this.app.listen(3000, () => {
            logger_1.logger.info('API is running at http://localhost:' + this.app.get('port'));
        });
    }
    initApp() {
        this.db.connect().then(() => {
            this.initExpressMiddleware();
            this.initRoutes();
        });
    }
    initExpressMiddleware() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use((0, helmet_1.default)());
        this.app.use(RateLimiter_1.limiter);
        if (process.env.NODE_ENV !== secrets_1.Environment.Test) {
            this.app.use(morgan('dev'));
        }
        process.on('uncaughtException', (err) => {
            if (err) {
                logger_1.logger.error(err.stack);
            }
        });
    }
    initRoutes() {
        this.app.use(`${API_BASE_URL}documents`, new documentRoutes_1.DocumentRoutes().router);
        this.app.use(`${API_BASE_URL}pages`, new pageRoutes_1.PageRoutes().router);
    }
}
const server = new Server();
server.start();
module.exports = server.app;
//# sourceMappingURL=server.js.map