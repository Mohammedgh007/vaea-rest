"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnectionManager = void 0;
/**
 * this files handles configuirng the connection with the database.
 */
const mysql2_1 = __importDefault(require("mysql2"));
class DbConnectionManager {
}
/**
 * It is used to initialize connection field and to setup the connection.
 */
DbConnectionManager.setupConnection = () => {
    DbConnectionManager.connection = mysql2_1.default.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });
    try {
        DbConnectionManager.connection.connect();
        console.log("connected successfully to the database");
    }
    catch (e) {
        console.log("could not connection to the database");
    }
};
/**
 * It is used to close the connection with the database.
 */
DbConnectionManager.closeConnection = () => {
    try {
        DbConnectionManager.connection.end();
        console.log("connected successfully to the database");
    }
    catch (e) {
        console.log("could not connection to the database");
    }
};
exports.DbConnectionManager = DbConnectionManager;
