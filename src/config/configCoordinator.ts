/**
 * This file allows server.ts to do all the config at one method call.
 */
import dotenv from 'dotenv'
import path from 'path'
import process from 'process';
import { DbConnectionManager } from './database/dbConnectionManager';
import { EmailManager } from './email/emailManager';
import { FileUploader } from './fileUpload/fileUploader';


/**
 * This method handles all the config in the project.
 */
export const configProject = async () => {
    configEnv()
    await DbConnectionManager.setupConnection()
    EmailManager.setupEmail()
    FileUploader.setupFileUploader()
}


/**
 * It is a helper method for config. It configs the env variables. src/config/env/dev.env
 */
const configEnv = () => { 
    const nodeEnv = process.env.npm_lifecycle_event?.substring(6) // 5 is the index of : in npm run commands
    dotenv.config({
        path: path.resolve(__dirname, `./env/${nodeEnv}.env`)
    })
}