import dotenv = require('dotenv');
import express = require('express');
import morgan = require('morgan');
import helmet from 'helmet';

import db = require('./config/database');
import { Environment } from './config/secrets';
import { logger } from './util/logger';

import { DocumentRoutes } from './routes/documentRoutes';
import { PageRoutes } from './routes/pageRoutes';
import { limiter } from './util/RateLimiter';

const API_BASE_URL = '/api/v1/';

class Server {
  public app: express.Application;
  private db: db.Db;

  constructor() {
    this.app = express();
    this.db = new db.Db();
    dotenv.config();
    this.initApp();
  }

  public start(): void {
    this.app.listen(3000, () => {
      logger.info('API is running at http://localhost:' + this.app.get('port'));
    });
  }

  private initApp(): void {
    this.db.connect().then(() => {
      this.initExpressMiddleware();
      this.initRoutes();
    });
  }

  private initExpressMiddleware(): void {
    this.app.set('port', process.env.PORT || 3000);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(helmet());
    this.app.use(limiter);

    if (process.env.NODE_ENV !== Environment.Test) {
      this.app.use(morgan('dev'));
    }
    process.on('uncaughtException', (err) => {
      if (err) {
        logger.error(err.stack);
      }
    });
  }

  private initRoutes(): void {
    this.app.use(`${API_BASE_URL}documents`, new DocumentRoutes().router);
    this.app.use(`${API_BASE_URL}pages`, new PageRoutes().router);
  }
}

const server = new Server();

server.start();

module.exports = server.app;
