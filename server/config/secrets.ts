import dotenv = require("dotenv");
import fs = require("fs");

import { logger } from "../util/logger";

export enum Environment {
  Production = "PRODUCTION",
  Development = "DEVELOPMENT",
  Test = "TEST",
}

/**
 * Loading environment file
 */
if (fs.existsSync(".env")) {
  dotenv.config({ path: ".env" });
  logger.debug("Using .env file to supply config environment variables");
} else {
  dotenv.config({ path: ".env.example" });
  logger.debug(
    "Using .env.example file to supply config environment variables"
  );
}

export const ENVIRONMENT = process.env.NODE_ENV;
const isProductionEnv = ENVIRONMENT === Environment.Production;

/**
 * Assigning environment variables
 */
export const MONGODB_URI = isProductionEnv
  ? process.env.MONGODB_URI
  : process.env.MONGODB_URI_LOCAL;
export const MONGODB_TEST_URI = process.env.MONGODB_TEST_URI;
export const SEED_DB = process.env.SEED_DB;
export const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Checking environment variables
 */
if (!JWT_SECRET) {
  logger.error("No jwt secret. Set JWT_SECRET environment variable.");
  process.exit(1);
}

if (!MONGODB_URI) {
  if (isProductionEnv) {
    logger.error(
      "No mongo connection string. Set MONGODB_URI environment variable."
    );
  } else {
    logger.error(
      "No mongo connection string. Set MONGODB_URI_LOCAL environment variable."
    );
  }
  process.exit(1);
}

if (!MONGODB_TEST_URI) {
  logger.error(
    "No mongo test connection string. Set MONGODB_TEST_URI environment variable."
  );
  process.exit(1);
}
