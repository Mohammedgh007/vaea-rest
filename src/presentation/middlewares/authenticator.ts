import jwt from 'jsonwebtoken';
import express, {Request, Response} from 'express';

/**
 * It handles generating and verifying jwt tokens.
 */
export class Authenticator {

    static TENANT_USER_TYPE = "TENANT";
    
    /**
     * It generates jwt token for the given user info.
     * @param userId stores the user id
     * @param userType stores user type in the same format as this class constants.
     * @returns the token string
     */
    static generateToken = async (userId: number, userType: string) => {
        // setup the jwt payload 
        const payload = {
            user_id: userId,
            user_type: userType
        }

        // generate the token 
        try {
            return await jwt.sign(payload, process.env.JWT_SECRET_KEY as string, { expiresIn: "120d"})
        } catch(e) {
            console.log("error in generating jwt token", e);
            throw e;
        }
        
    }


    static verifyToken = async (req: Request, res: Response, next: any) => {
        try {
            // get the token value
            const bearerHeader = req.headers["authorization"]
            const bearer: string[] = bearerHeader?.split(" ") as string[]
            const token = bearer[1];

            // verify token
            const payload: any = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
            
            if (req.method === "GET") {
                req.query.user_id = payload.user_id
                req.query.user_type = payload.user_type
            } else {
                req.body.user_id = payload.user_id
                req.body.user_type = payload.user_type
            }
            next()
        } catch(e) {
            //console.log("error in auth token ", e)
            res.sendStatus(403)
        }
        
    }
}