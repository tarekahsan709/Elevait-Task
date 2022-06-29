import * as mongoose from 'mongoose';
import { logger } from '../util/logger';

import { Environment, MONGODB_TEST_URI, MONGODB_URI } from './secrets';


export class Db {
  private static getUri(): string {
    if (process.env.NODE_ENV === Environment.Test) {
      return MONGODB_TEST_URI;
    } else {
      return MONGODB_URI;
    }
  }

  /**
   * Connect with the database
   */
  public async connect(): Promise<void> {
    mongoose.connect(Db.getUri(), err => {
      if (err) {
        logger.error('mongoose connecting failed: ', err);
      }
    });
    mongoose.connection.on('error', (err) => {
      logger.error('Error connecting to MongoDB: ', err);
    });
    mongoose.connection.once('open', async () => {
      if (process.env.NODE_ENV !== Environment.Test) {
        logger.info('Database has connected');
      } else {
        logger.info('Test Database has connected');
      }
    });
  }

  /**
   * Disconnect with the database
   */
  public async disconnect(): Promise<void> {
    mongoose.connection.close(() => {
      logger.info(
        'Mongoose default connection disconnected through app termination'
      );
      process.exit(0);
    });
  }
}
