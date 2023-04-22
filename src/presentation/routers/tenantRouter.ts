/**
 * This file hanldes recieving the request and then sending the proper response
 * utilizing the business layer. In addition, middlewares are called here.
 */
import express, {Express, Request, Response} from 'express';


const MIN_MOBILE_VERSION: String = "1.0.0";

// this router recieves requests and sends responses. Also, It handles calling
// middleware
export const tenantRouter = express.Router()


// this route is used to return the minimum version number for the mobile app to 
// use this rest api.
tenantRouter.get("/get-minimum-mobile-version", (req: Request, res: Response) => { 
    res.send({
        status: 1,
        data: {
            minimum_version: MIN_MOBILE_VERSION
        }
    });
}) 

