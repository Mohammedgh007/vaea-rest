"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configProject = void 0;
/**
 * This file allows server.ts to do all the config at one method call.
 */
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const process_1 = __importDefault(require("process"));
const dbConnectionManager_1 = require("./database/dbConnectionManager");
const emailManager_1 = require("./email/emailManager");
const fileUploader_1 = require("./fileUpload/fileUploader");
/**
 * This method handles all the config in the project.
 */
const configProject = () => {
    configEnv();
    dbConnectionManager_1.DbConnectionManager.setupConnection();
    emailManager_1.EmailManager.setupEmail();
    fileUploader_1.FileUploader.setupFileUploader();
};
exports.configProject = configProject;
/**
 * It is a helper method for config. It configs the env variables. src/config/env/dev.env
 */
const configEnv = () => {
    var _a;
    console.log("lllllll", process_1.default.env.npm_lifecycle_event);
    const nodeEnv = (_a = process_1.default.env.npm_lifecycle_event) === null || _a === void 0 ? void 0 : _a.substring(6); // 5 is the index of : in npm run commands
    dotenv_1.default.config({
        path: path_1.default.resolve(__dirname, `./env/${nodeEnv}.env`)
    });
};
