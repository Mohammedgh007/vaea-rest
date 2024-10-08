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
import { ConfirmBookingRequestTenant } from '../requests/tenants/confirmBookingRequestTenant';
import { ConfirmBookingDtoInTenant } from '../../business/dtoIn/tenants/confirmBookingDtoInTenant';
import { GetMonthActivitiesRequestTenant } from '../requests/tenants/getMonthActivitiesRequestTenant';
import { GetMonthActivitiesResponseTenant } from '../responses/tenants/getMonthActivitiesResponseTenant';
import { ActivityDetailsResponseTenant } from '../responses/tenants/activityDetailsReponseTenant';
import { UpdateAttendanceActivityRequestTenant } from '../requests/tenants/updateAttendanceActivityRequestTenant';
import { ServicesHistoryResponseTenant } from '../responses/tenants/servicesHistoryResponseTenant';
import { SubmitCleaningServiceRequestTenant } from '../requests/tenants/submitCleaningServiceRequestTenant';
import { SubmitPlumbingServiceRequestTenant } from '../requests/tenants/submitPlumbingServiceRequestTenant';
import { SubmitElectracianServiceRequestTenant } from '../requests/tenants/submitElectricianServiceRequestTenant';
import { GetMonthActivitiesDtoIn } from '../../business/dtoIn/tenants/getMonthActivitiesDtoInTenant';
import { UpdateAttendanceDtoInTenant } from '../../business/dtoIn/tenants/updateAttendanceActivityDtoInTenant';
import { SubmitCleaningServiceDtoInTenant } from '../../business/dtoIn/tenants/submitCleaningServiceDtoInTenant';
import { SubmitPlumbingServiceDtoInTenant } from '../../business/dtoIn/tenants/submitPlumbingServiceDtoInTenant';
import { SubmitElectrcianServiceDtoInTenant } from '../../business/dtoIn/tenants/submitElectricianServiceDtoInTenant';
import { TenantHomeDetailsDtoOutTenant } from '../../business/dtoOut/tenants/tenantHomeDetailsDtoOutTenant';
import { TenantHomeDetailsResponseTenant } from '../responses/tenants/tenantHomeDetailsResponseTenant';
import { ResetPasswordRequestTenant } from '../requests/tenants/resetPasswordRequestTenant';
import { ResetPasswordDtoInTenant } from '../../business/dtoIn/tenants/resetPasswordDtoInTenant';

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


// This route is used to reset password. It must be used after otp verification
tenantRouter.post("/reset-password", async (req: Request, res: Response) => {
    try {
        const requestFields: ResetPasswordRequestTenant = ResetPasswordRequestTenant.mapJsonToResetPasswordRequestTenant(req)
        const serviceInput: ResetPasswordDtoInTenant = ResetPasswordDtoInTenant.mapResetPasswordRequestTenantToResetPasswordDtoInTenant(requestFields)
    
        await tenantService.resetPassword(serviceInput)

        res.send({
            status: 0,
            data: null
        })       
    } catch(e) {
        res.sendStatus(400)
    }
})


// this route is used to view tenant lease by his/her tenant
tenantRouter.get("/view-lease", Authenticator.verifyToken, async (req: Request, res: Response) => {
    try {
        // TODO 
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


// This route is used to create a lock for beginning the process of booking.
tenantRouter.post("/attempt-booking", Authenticator.verifyToken, async (req: Request, res: Response) => {
    try {
        const unit_id = req.body.unit_id 
        const wasSuccessful: boolean = await tenantService.attemptBooking(unit_id, req.body.user_id)
        res.send({
            status: (wasSuccessful) ? 0 : -1,
            data: null
        })
    } catch(e) {
        res.sendStatus(400)
    }
})


/// This route is used to verify payment and confirm the booking.
tenantRouter.post("/confirm-booking", Authenticator.verifyToken, async (req: Request, res: Response) => {
    try {
        
        const requestFields = ConfirmBookingRequestTenant.mapJsonToConfirmBookingRequestTenant(req)
        const serviceFields = ConfirmBookingDtoInTenant.mapConfirmBookingRequestTenantToConfirmBookingDtoInTenant(requestFields, req.body.user_id)
        const leaseId: number = await tenantService.confirmBooking(serviceFields)
        res.send({
            status: 1,
            data: {
                lease_id: leaseId
            }
        })
    } catch(e) {
        res.sendStatus(400)
    }
})


// This route is used to release a lock for cancelling the process of booking.
tenantRouter.post("/release-attempt-booking", Authenticator.verifyToken, async (req: Request, res: Response) => {
    try {
        const unit_id = req.body.unit_id 
        await tenantService.releaseAttemptBooking(unit_id, req.body.user_id)
        res.send({
            status: 0,
            data: null
        })
    } catch(e) {
        res.sendStatus(400)
    }
})


// This route is used to terminate an account after verifying otp type termination
tenantRouter.post("/terminate-account", Authenticator.verifyToken, async (req: Request, res: Response) => {
    try {
        const reason: string = req.body.reason 
        await tenantService.terminateAccount(reason, req.body.user_id)
        res.send({
            status: 0,
            data: null
        })
    } catch(e) {
        res.sendStatus(400)
    }
})


// This route is used to retrieve the list of activities' event in a given month
tenantRouter.get("/get-month-activities", Authenticator.verifyToken, async (req: Request, res: Response) => {
    try {
        const requestsFields = GetMonthActivitiesRequestTenant.mapJsonToGetMonthActivitiesRequestTenant(req)
        const serviceFields = GetMonthActivitiesDtoIn.mapGetMonthActivitiesRequestTenantToGetMonthActivitiesDtoIn(requestsFields)
        const serviceOutput = await tenantService.getAcitivitiesList(serviceFields)
        const responseData: Array<GetMonthActivitiesResponseTenant> = serviceOutput.map((item) => GetMonthActivitiesResponseTenant.mapGetMonthActivitiesDtoOutTenantTOGetMonthActivitiesResponseTenant(item))
        res.send({
            status: (responseData.length !== 0) ? 1 : 0,
            data: responseData
        })
    } catch(e) {
        res.sendStatus(400)
    }
})

// This route is used to retrieve the deatils of a given activity event.
tenantRouter.get("/get-activity-details", Authenticator.verifyToken, async (req: Request, res: Response) => {
    try {
        const activity_id = req.query.activity_id
        const serviceOutput = await tenantService.getActivityDetails(activity_id as string, req.query.user_id as string)
        const responseData = ActivityDetailsResponseTenant.mapActivityDetailsDtoOutTenantToActivityDetailsResponseTenant(serviceOutput)
        res.send({
            status: 1,
            data: responseData
        })
    } catch(e) {
        console.log("error", e)
        res.sendStatus(400)
    }
})

// This route is used to indicate that a use wants to register his/her attendance to an activity.
tenantRouter.post("/update-user-attendance", Authenticator.verifyToken, async (req: Request, res: Response) => {
    try {
        const requestFields = UpdateAttendanceActivityRequestTenant.mapJsonToUpdateAttendanceActivityRequestTenant(req)
        const serviceFields = UpdateAttendanceDtoInTenant.mapUpdateAttendanceActivityRequestTenantToupdateAttendanceDtoInTenant(requestFields)
        await tenantService.updateActivityAttendance(serviceFields)
        res.send({
            status: 0,
            data: null
        })
    } catch(e) {
        res.sendStatus(400)
    }
})

// This route is used to retrieves tenant's list of requests.
tenantRouter.get("/get-tenant-services-requests", Authenticator.verifyToken, async (req: Request, res: Response) => {
    try {
        const serviceOutputs = await tenantService.retrieveServicesRequestHistory(req.query.user_id as string)
        const responseData = serviceOutputs.map((output) => ServicesHistoryResponseTenant.mapServicesHistoryResponseTenantTOServicesHistoryDtoOutTenant(output))
        res.send({
            status: (responseData && responseData.length != 0) ? 1 : 0,
            data: responseData
        })
    } catch(e) {
        res.sendStatus(400)
    }
})

// This route is used to submit a request for house cleaning service. 
tenantRouter.post("/submit-clean-house", Authenticator.verifyToken, async (req: Request, res: Response) => {
    try {
        const requestFields = SubmitCleaningServiceRequestTenant.mapJsonToSubmitCleaningServiceRequestTenant(req)
        const serviceFields = SubmitCleaningServiceDtoInTenant.mapRSubmitCleaningServiceRequestTenantToSubmitCleaningServiceDtoInTenant(requestFields)
        const requestId = await tenantService.submitCleanHouse(serviceFields)
        
        res.send({
            status: 1,
            data: {
                "request_id": requestId
            }
        })
    } catch(e) {
        res.sendStatus(400) // mean the user has not lease
    }
})

// This route is used to submit a request for plumbing service. 
tenantRouter.post("/submit-plumbing", Authenticator.verifyToken, async (req: Request, res: Response) => {
    try {
        const requestFields = SubmitPlumbingServiceRequestTenant.mapJsonToSubmitPlumbingServiceRequestTenant(req)
        const serviceFields = SubmitPlumbingServiceDtoInTenant.mapSubmitPlumbingServiceRequestTenantToSubmitPlumbingServiceDtoInTenant(requestFields, req.body.user_id as string)
        const requestId = await tenantService.submitPlumbing(serviceFields)
        
        res.send({
            status: 1,
            data: {
                "request_id": requestId
            }
        })
    } catch(e) {
        res.sendStatus(400) // mean the user has not lease
    }
})

// This route is used to submit a request for electracian service. 
tenantRouter.post("/submit-electracian", Authenticator.verifyToken, async (req: Request, res: Response) => {
    try {
        const requestFields = SubmitElectracianServiceRequestTenant.mapJsonToSubmitElectracianServiceRequestTenant(req)
        const serviceFields = SubmitElectrcianServiceDtoInTenant.mapSubmitElectracianServiceRequestTenantToSubmitElectrcianServiceDtoInTenant(requestFields, req.body.user_id)
        const requestId = await tenantService.submitElectrician(serviceFields)
        
        res.send({
            status: 1,
            data: {
                "request_id": requestId
            }
        })
    } catch(e) {
        res.sendStatus(400) // mean the user has not lease
    }
})

// This route is used to submit a request for ac technician service. 
tenantRouter.post("/submit-ac", Authenticator.verifyToken, async (req: Request, res: Response) => {
    try {
        
        res.send({
            status: 0,
            data: {
                "request_id": 3
            }
        })
    } catch(e) {
        res.sendStatus(400)
    }
})


// This is used to view the current home details that includes the roommates info
tenantRouter.get("/get_my_home_details", Authenticator.verifyToken, async (req: Request, res: Response) => {
    try {
        const serviceOutput: TenantHomeDetailsDtoOutTenant = await tenantService.getTeantHomeDetails(req.query.user_id as string)
        const responseData: TenantHomeDetailsResponseTenant = TenantHomeDetailsResponseTenant.mapTenantHomeDetailsDtoOutTenantToTenantHomeDetailsResponseTenant(serviceOutput)
        
        res.send({
            status: (responseData) ? 1 : 0,
            data: responseData
        })
    } catch(e) {
        console.log("error is ", e)
        res.sendStatus(400)
    }
})
