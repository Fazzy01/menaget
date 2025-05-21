import type { Knex } from 'knex';
import { config } from 'dotenv';
import path from 'path';

config();

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: './src/db/migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },
  test: {
    client: 'pg',
    connection: {
      host: process.env.TEST_DB_HOST,
      port: parseInt(process.env.TEST_DB_PORT || '5432'),
      user: process.env.TEST_DB_USER,
      password: process.env.TEST_DB_PASSWORD,
      database: process.env.TEST_DB_NAME,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: './src/db/migrations',
      extension: 'ts',
    },
  },
  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
        directory: path.resolve(__dirname, 'db/migrations'), // Correct path
        tableName: 'knex_migrations',
        extension: 'ts'
    },
  },
};

export default knexConfig;