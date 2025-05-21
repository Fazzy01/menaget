"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
// config();
(0, dotenv_1.config)({ path: path_1.default.join(__dirname, '../.env') });
console.log("OUR HOST", process.env.DB_HOST);
console.log("OUR PORT", process.env.DB_PORT);
console.log("OUR USER", process.env.DB_USER);
console.log("OUR PASSWORD", process.env.DB_PASSWORD);
console.log("OUR DB_NAME", process.env.DB_NAME);
const knexConfig = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '5432'),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            //   ssl: { rejectUnauthorized: false }, //for live coonnection only
        },
        migrations: {
            directory: path_1.default.join(__dirname, 'db/migrations'),
            extension: 'js',
        },
        seeds: {
            directory: path_1.default.join(__dirname, 'db/seeds'),
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
            //   ssl: { rejectUnauthorized: false }, //for live coonnection only
        },
        migrations: {
            directory: './src/db/migrations',
            //   extension: 'ts',
        },
    },
    production: {
        client: 'pg',
        connection: {
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }, //for live coonnection only
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: path_1.default.join(__dirname, 'db/migrations'),
            tableName: 'knex_migrations',
            disableTransactions: true,
            extension: 'js'
        },
    },
};
exports.default = knexConfig;
console.log("knexConfig : ", knexConfig);
