/**
 * This file hanldes recieving the request and then sending the proper response
 * utilizing the business layer. In addition, middlewares are called here.
 * @pre-condition setupTenantRouter() must be called before calling app.use
 */
import express, {Express, Request, Response} from 'express';
import multer from 'multer'

import { Authenticator } from '../middlewares/authenticator';
import bcrypt from 'bcrypt';
import { SendOTPRequestTenant } from '../requests/tenants/sendOTPRequestTenant';
import { TenantService } from '../../business/services/tenentService';
import { SendOTPDtoInTenant } from '../../business/dtoIn/tenants/sendOTPDtoInTenant';
import { VerifyOTPRequestTenant } from '../requests/tenants/verifyOTPRequestTenant';
import { VerifyOTPDtoInTenant } from '../../business/dtoIn/tenants/verifyOTPDtoInTenant';
import { RegisterRequestTenant } from '../requests/tenants/registerRequestTenant';
import { RegisterDtoInTenant } from '../../business/dtoIn/tenants/registerDtoInTenant';
import { RegisterDtoOutTenant } from '../../business/dtoOut/tenants/registerDtoOutTenant';
import { RegisterResponseTenant } from '../responses/tenants/registerResponseTenant';
import { SignInRequestTenant } from '../requests/tenants/signInRequestTenant';
import { SignInDtoInTenant } from '../../business/dtoIn/tenants/signInDtoIntTenant';
import { SignInDtoOutTenant } from '../../business/dtoOut/tenants/signInDtoOutTenant';
import { SignInResponseTenant } from '../responses/tenants/signInResponseTenant';
import { SearchUnitsRequestTenant } from '../requests/tenants/searchUnitsRequestTenant';
import { SearchUnitsDtoTenant } from '../../business/dtoIn/tenants/SearchUnitsDtoTenant';
import { SearchUnitsDtoOutTenant } from '../../business/dtoOut/tenants/searchUnitsDtoOutTenant';
import { SearchUnitsResponseTenant } from '../responses/tenants/unitsSearchResponseTenant';
import { UnitDetailsDtoOutTenant } from '../../business/dtoOut/tenants/unitDetailsDtoOutTenant';
import { UnitDetailsResponseTenant } from '../responses/tenants/unitDetailsResponseTenant';

const MIN_MOBILE_VERSION: String = "1.0.0";
const upload = multer({ dest: "./uploads" })

// this router recieves requests and sends responses. Also, It handles calling
// middleware
export const tenantRouter = express.Router() // password input must be less than 55

let tenantService: TenantService 

export const setupTenantRouter = () => {
    tenantService = new TenantService()
}

// this route is used to return the minimum version number for the mobile app to 
// use this rest api.
tenantRouter.get("/get-minimum-mobile-version", (req: Request, res: Response) => {
    console.log("recv")
    res.send({
        status: 1,
        data: {
            minimum_version: MIN_MOBILE_VERSION
        }
    });
}) 


// this route is used to request sending otp
tenantRouter.post("/send-otp", async (req: Request, res: Response) => {
    try {
        const requestFields: SendOTPRequestTenant = SendOTPRequestTenant.mapJsonToSendOTPRequestTenant(req.body)
        await tenantService.sendOtp(SendOTPDtoInTenant.mapSendOTPRequestTenantToSendOTPDtoIn(requestFields));
        res.send({
            status: 0,
            data: null
        })
    } catch(e) {
        res.sendStatus(400)
    }
    
})


// this route is used to verify the otp code
tenantRouter.post("/verify-otp", async (req: Request, res: Response) => {
    try {
        const requestFields: VerifyOTPRequestTenant = VerifyOTPRequestTenant.mapJsonToVerifyOTPRequestTenant(req.body)
        const isValid: boolean = await tenantService.verifyOTP(VerifyOTPDtoInTenant.mapVerifyOTPRequestTenantToVerifyOTPDtoInTenant(requestFields));

        if (isValid) {
            res.send({
                status: 0,
                data: null
            })
        } else {
            res.send({
                status: -1,
                data: null
            })
        }
        
    } catch(e) {
        res.sendStatus(400)
    }
})


// this route is used to sign up tenants
tenantRouter.post("/register", upload.single("profile_image"), async (req: Request, res: Response) => {
    try {
        
        const requestFields: RegisterRequestTenant = RegisterRequestTenant.mapJsonToRegisterRequestTenant(req)
        const dtoOut: RegisterDtoOutTenant = await tenantService.register(RegisterDtoInTenant.mapRegisterRequestTenantToRegisterDtoInTenant(requestFields));
        const userAuthToken = await Authenticator.generateToken(dtoOut.userId, "TENANT")
        const responseData = new RegisterResponseTenant(dtoOut.profileImageUrl, userAuthToken)

        res.send({
            status: 1,
            data: responseData
        })
    } catch(e) {
        res.sendStatus(400)
    }
})


// This route is used to verify that the given email has not been used by other users.
tenantRouter.get("/verify-email", async (req: Request, res: Response) => {
    try {
        const wasNotUsed: boolean = await tenantService.verifyEmail(req.query.email_address as string)

        res.send({
            status: 1,
            data: {
                "was_not_used": wasNotUsed
            }
        })
    } catch(e) {
        res.sendStatus(400)
    }
})


// this route is used sign in tenants
tenantRouter.post("/sign-in", async (req: Request, res: Response) => {
    try {
        const requestFields: SignInRequestTenant = SignInRequestTenant.mapJsonToSignInRequestTenant(req)
        const serviceOutput: SignInDtoOutTenant = await tenantService.signIn(SignInDtoInTenant.mapSignInRequestTenantToSignInDtoInTenant(requestFields))
    
        const authToken: string = await Authenticator.generateToken(serviceOutput.user_id, Authenticator.TENANT_USER_TYPE)
        let responseData: SignInResponseTenant = SignInResponseTenant.mapSignInDtoOutTenantToSignInResponseTenant(serviceOutput, authToken)
        res.send({
            status: 1,
            data: responseData
        })        
    } catch(e) {
        res.sendStatus(400)
    }
})


// this route is used to view tenant lease by his/her tenant
tenantRouter.get("/view-lease", Authenticator.verifyToken, async (req: Request, res: Response) => {
    try {

        res.send({
            status: 0,
            data: null
        });
    } catch(e) {
        res.sendStatus(400)
    }
})


// this route is used to search for the available housing units
tenantRouter.get("/search-units", async (req: Request, res: Response) => {
    try {
        const requestFields: SearchUnitsRequestTenant = SearchUnitsRequestTenant.mapJsonToSearchUnitsRequestTenant(req)
        console.log(requestFields)
        const serviceInputs = SearchUnitsDtoTenant.mapSearchUnitsRequestTenantToSearchUnitsDtoTenant(requestFields)
        const serviceOutput: Array<SearchUnitsDtoOutTenant> = await tenantService.searchUnits(serviceInputs)
        const responseData: Array<SearchUnitsResponseTenant> = serviceOutput.map((unit) => SearchUnitsResponseTenant.mapSearchUnitsDtoOutTenantToSearchUnitsResponseTenant(unit))
        
        res.send({
            status: (responseData.length == 0) ? 0 : 1,
            data: responseData
        });
    } catch(e) {
        res.sendStatus(400)
    }
})

// This route is used to retireves the details of the given housing unit.
tenantRouter.get("/unit_details", async (req: Request, res: Response) => {
    try {
        const unit_id = req.query.unit_id 
        if (unit_id == undefined) {
            res.send({
                status: -1,
                data: null
            });
        } else {
            const serviceOutput: UnitDetailsDtoOutTenant = await tenantService.retireveUnitDetail(unit_id as string)
            const responseData: UnitDetailsResponseTenant = UnitDetailsResponseTenant.mapUnitDetailsOutputTenantToUnitDetailsResponseTenant(serviceOutput)
            
            res.send({
                status: 1,
                data: responseData
            });
        }
    } catch(e) {
        res.sendStatus(400)
    }
})


