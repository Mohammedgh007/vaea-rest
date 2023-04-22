/**
 * This is the main the file of project. It is where the setup is done.
 */

import express, {Express, Request, Response} from 'express';
import { tenantRouter } from './presentation/routers/tenantRouter';
import { configProject } from './config/configCoordinator';


const app: Express = express()

// handle project configuration
configProject()


// setup routers
app.use("/tenants", tenantRouter)

app.listen(process.env.PORT, ()=> {
console.log(`[Server]: I am running at https://localhost:${process.env.PORT}`)
});