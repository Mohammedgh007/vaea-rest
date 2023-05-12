/**
 * This is the main the file of project. It is where the setup is done.
 */

import express, {Express, Request, Response} from 'express';
import { setupTenantRouter, tenantRouter } from './presentation/routers/tenantRouter';
import { configProject } from './config/configCoordinator';


const app: Express = express()

// handle project configuration
configProject()
app.use(express.json())
app.use(express.static("./uploads"))


// setup routers
setupTenantRouter()
app.use("/tenants", tenantRouter)

app.listen(process.env.PORT, ()=> {
console.log(`[Server]: I am running at https://localhost:${process.env.PORT}`)
});