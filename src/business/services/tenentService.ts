import { EmailManager } from "../../config/email/emailManager";
import { FileUploader } from "../../config/fileUpload/fileUploader";
import { TenantDAO } from "../../dataAccess/dao/tenantDAO";
import VerifyAndAddInputTenant from "../../dataAccess/inputs/tenants/verifyAndAddInputTenant";
import { SaveOTPCodeInputTenant } from "../../dataAccess/inputs/tenants/saveOTPCodeInputTenant";
import { VerifyOTPInputTenant } from "../../dataAccess/inputs/tenants/verifyOTPInputTenant";
import { RegisterDtoInTenant } from "../dtoIn/tenants/registerDtoInTenant";
import { SendOTPDtoInTenant } from "../dtoIn/tenants/sendOTPDtoInTenant";
import { VerifyOTPDtoInTenant } from "../dtoIn/tenants/verifyOTPDtoInTenant";
import { RegisterDtoOutTenant } from "../dtoOut/tenants/registerDtoOutTenant";
import { SignInDtoInTenant } from "../dtoIn/tenants/signInDtoIntTenant";
import { SignInInputTenant } from "../../dataAccess/inputs/tenants/signInInputTenant";
import { UserInfoOutputTenant } from "../../dataAccess/outputs/tenants/userInfoOutputTenant";
import { SignInDtoOutTenant } from "../dtoOut/tenants/signInDtoOutTenant";
import { SearchUnitsDtoTenant } from "../dtoIn/tenants/SearchUnitsDtoTenant";
import { SearchUnitsInputTenant } from "../../dataAccess/inputs/tenants/searchUnitsInputTenant";
import { SearchUnitsOutputTenant } from "../../dataAccess/outputs/tenants/searchUnitsOutputTenant";
import { SearchUnitsDtoOutTenant } from "../dtoOut/tenants/searchUnitsDtoOutTenant";
import { UnitDetailsOutputTenant } from "../../dataAccess/outputs/tenants/unitDetailsOutput.tenant";
import { UnitDetailsDtoOutTenant } from "../dtoOut/tenants/unitDetailsDtoOutTenant";
import { ConfirmBookingDtoInTenant } from "../dtoIn/tenants/confirmBookingDtoInTenant";
import { PaymentService } from "./paymentService";
import { LeaseGenerationInputTenant } from "../../dataAccess/inputs/tenants/leaseGenerationInputTenant";
import { GetMonthActivitiesDtoIn } from "../dtoIn/tenants/getMonthActivitiesDtoInTenant";
import { GetMonthActivitiesInputTenant } from "../../dataAccess/inputs/tenants/getMonthActivitiesInputTenant";
import { GetMonthActivitiesOutputTenant } from "../../dataAccess/outputs/tenants/getMonthActivitiesOutputTenant";
import { GetMonthActivitiesDtoOutTenant } from "../dtoOut/tenants/getMonthActivitiesDtoOutTenant";
import { ActivityDetailsOutputTenant } from "../../dataAccess/outputs/tenants/activityDetailsOutputTenant";
import { ActivityDetailsDtoOutTenant } from "../dtoOut/tenants/activityDetailsDtoOutTenant";
import { UpdateAttendanceDtoInTenant } from "../dtoIn/tenants/updateAttendanceActivityDtoInTenant";
import { UpdateAttendanceActivityInputTenant } from "../../dataAccess/inputs/tenants/updateAttendanceActivityInput";
import { SubmitCleaningServiceDtoInTenant } from "../dtoIn/tenants/submitCleaningServiceDtoInTenant";
import { SubmitCleaningServiceInputTenant } from "../../dataAccess/inputs/tenants/submitCleaningServiceInputTenant";
import { SubmitPlumbingServiceDtoInTenant } from "../dtoIn/tenants/submitPlumbingServiceDtoInTenant";
import { SubmitPlumbingServiceInputTenant } from "../../dataAccess/inputs/tenants/submitPlumbingServiceInputTenant";
import { SubmitElectrcianServiceDtoInTenant } from "../dtoIn/tenants/submitElectricianServiceDtoInTenant";
import { SubmitElectricianServiceInputTenant } from "../../dataAccess/inputs/tenants/submitElectricianServiceInputTenant";
import { ServicesHistoryDtoOutTenant } from "../dtoOut/tenants/servicesHistoryDtoOutTenant";
import { TenantHomeDetailsOutputTenant } from "../../dataAccess/outputs/tenants/tenantHomeDetailsOutputTenant";
import { TenantHomeDetailsDtoOutTenant, TenantHomeDetailsDtoOutTenantRoommates } from "../dtoOut/tenants/tenantHomeDetailsDtoOutTenant";
import { NotificationService } from "./notificationService";
import { TenantHomeDetails4AdminOutputTenant } from "../../dataAccess/outputs/tenants/tenantHomeDetails4AdminOutputTenant";
import { ResetPasswordDtoInTenant } from "../dtoIn/tenants/resetPasswordDtoInTenant";
import { ResetPasswordInputTenant } from "../../dataAccess/inputs/tenants/resetPasswordInputTenant";

/**
 * This file handles the business logic for tentant request.
 */
export class TenantService {

    tenantDao: TenantDAO
    paymentService: PaymentService
    notifyService: NotificationService

    constructor() {
        this.tenantDao = new TenantDAO()
        this.paymentService = new PaymentService()
        this.notifyService = new NotificationService()
    }

    // It handles send-otp request
    sendOtp = async (serviceFields: SendOTPDtoInTenant) => {
        try {
            const otpCode: string = await this.tenantDao.saveOTPCode(SaveOTPCodeInputTenant.mapSendOTPDtoInTenantToSaveOTPCodeInputTenant(serviceFields))
            
            const text: string = `Your otp is ${otpCode}`
            let title;
            if (serviceFields.request_type === "REGISTRATION") {
                title = "REGISTRATION OTP"
            } else if (serviceFields.request_type == "TERMINATION") {
                title = "TERMINATION OTP"
            } else {
                title = "PASSWORD RESET OTP"
            }
            EmailManager.sendNotificationEmail(serviceFields.email_address, title, text)
        } catch(e) {
            throw e;
        }
    }



    /**
     * It handles verify-otp request 
     * @param serviceFields stores the required fields.
     * @returns Promise<boolean> ; it is true if the given code is correct.
     */
    verifyOTP = async (serviceFields: VerifyOTPDtoInTenant): Promise<boolean> => {
        try {
            const isValid = this.tenantDao.verifyOTP(VerifyOTPInputTenant.mapVerifyOTPDtoInTenantToVerifyOTPInputTenant(serviceFields))
            return isValid;
        } catch(e) {
            throw e;
        }
    }


    /**
     * It handles register request
     * @param serviceFields stores the required fields.
     */
    register = async(serviceFields: RegisterDtoInTenant): Promise<RegisterDtoOutTenant> => {
        try {
            let daoInputs: VerifyAndAddInputTenant = VerifyAndAddInputTenant.mapRegisterDtoInTenant(serviceFields)
            let fileUrl = null
            
            // upload image
            if(serviceFields.profile_image !== null && serviceFields.profile_image.mimetype.includes("image")) {
                fileUrl = await FileUploader.uploadProfileImage( serviceFields.profile_image )
                daoInputs.profile_image = fileUrl
            }
            
            
            // add tenant
            const insertedId: number = await this.tenantDao.verifyAndAddTenant(daoInputs)

            return new RegisterDtoOutTenant(fileUrl, insertedId)
        } catch(e) {
            console.log("error service.register ", e)
            throw e;
        }
    }


    /**
     * It checks the given email if it has been used by other users.
     * @param emailAddress represents the target email.
     * @returns true if it has not been used.
     */
    verifyEmail = async(emailAddress: string): Promise<boolean> => {
        try {
            const wasNotUsed = await this.tenantDao.verifyEmail(emailAddress)
            return wasNotUsed
        } catch(e) {
            throw e
        }
    }


    /**
     * It verifies credientials and retirives profile info.
     * @param serviceFields stores the required fields.
     */
    signIn = async(serviceFields: SignInDtoInTenant): Promise<SignInDtoOutTenant> => {
        try {
            let daoInputs: SignInInputTenant = SignInInputTenant.mapSignInDtoInTenantToSignInInputTenant(serviceFields)
            const result: UserInfoOutputTenant = await this.tenantDao.loadUserInfo(daoInputs)
            return SignInDtoOutTenant.mapUserInfoOutputTenantToSignInDtoOutTenant(result)
        } catch(e) {
            throw e
        }
    }


    /**
     * It is used to reset the tenant password.
     * @param serviceFields 
     */
    resetPassword = async(serviceFields: ResetPasswordDtoInTenant): Promise<void> => {
        try {
            const daoInput = ResetPasswordInputTenant.mapresetPasswordDtoInTenantToSignInInputTenant(serviceFields)
            await this.tenantDao.verifiesPasswordAndResetPassword(daoInput)
        } catch(e) {
            throw e
        }
    }


    /**
     * It searches and retireves the available housing units.
     * @param serviceFields stores the required fields.
     */
    searchUnits = async(serviceFields: SearchUnitsDtoTenant): Promise< Array<SearchUnitsDtoOutTenant> > => {
        try {
            let daoInputs: SearchUnitsInputTenant = SearchUnitsInputTenant.mapSearchUnitsDtoTenantToSearchUnitsInputTenant(serviceFields)
            const daoOutput:  Array<SearchUnitsOutputTenant> = await this.tenantDao.searchUnit(daoInputs)
            const output: Array<SearchUnitsDtoOutTenant> = daoOutput.map((unit) => {
                return SearchUnitsDtoOutTenant.mapSearchUnitsOutputTenantToSearchUnitsDtoOutTenant(unit)
            }) 
            return output
        } catch(e) {
            throw e
        }
    }


    // It retirves the details of the given housing unit
    retireveUnitDetail = async(unit_id: string): Promise<UnitDetailsDtoOutTenant> => {
        try {
            const daoOutput: UnitDetailsOutputTenant = await this.tenantDao.loadUnitDetails(unit_id)
            return UnitDetailsDtoOutTenant.mapUnitDetailsOutputTenantToUnitDetailsDtoOutTenant(daoOutput)
        } catch(e) {
            throw e
        }
    }


    /**
     * It generates a lock for handling race condition prior to completing the booking.
     * @param unit_id 
     * @returns true if it was successfull
     */
    attemptBooking = async(unit_id: string, user_id: string): Promise<boolean> => {
        try {
            return await this.tenantDao.lockUnitForBooking(unit_id, user_id)
        } catch(e) {
            throw e
        }
    }


    // It verifies the payment and confirm the booking 
    confirmBooking = async(servicesField: ConfirmBookingDtoInTenant): Promise<number> => {
        try {
            const hasAcquiredLock: boolean = await this.tenantDao.verifyLock(servicesField.unit_id, servicesField.user_id)
            if (!hasAcquiredLock) {throw new Error()}

            const unitPriceMonthly: number = await this.tenantDao.retrieveUnitPrice(servicesField.unit_id)
            const paidAmount: number = await this.paymentService.verifyBookingPayment(servicesField.payment_provider, servicesField.unit_id, servicesField.payment_id)
            
            if (this._verifyBookingAmounts(paidAmount, unitPriceMonthly, servicesField.lease_period_type) 
                && this._verifyBookingDates(servicesField.starting_date, servicesField.ending_date, servicesField.lease_period_type)) {
                    const result: number = await this.tenantDao.generateLease(LeaseGenerationInputTenant.mapConfirmBookingDtoInTenant(servicesField))
                    return result
            } else {
                throw new Error()
            }
            
        } catch(e) {
            throw e
        }
    }


    _verifyBookingAmounts = (paidAmount: number, monthlyPrice: number, leaseType: string): boolean => {
        return true; // TODO
    }

    _verifyBookingDates = (startDate: Date, endDate: Date, leaseType: string): boolean => {
        return true; // TODO
    }


    /**
     * It releases a lock for handling race condition prior to completing the booking.
     * @param unit_id 
     */
    releaseAttemptBooking = async(unit_id: string, user_id: string): Promise<void> => {
        try {
            await this.tenantDao.releaseLockUnitForBooking(unit_id, user_id)
        } catch(e) {
            throw e
        }
    }


    terminateAccount = async(reason: string, user_id: string): Promise<void> => {
        try {
            await this.tenantDao.verifyAndTerminate(user_id)
        } catch(e) {
            throw e
        }
    }


    /**
     * It retireives the list of activities for a given month.
     */
    getAcitivitiesList = async(serviceFields: GetMonthActivitiesDtoIn): Promise<Array<GetMonthActivitiesDtoOutTenant>> => {
        try { 
            const inputFields = GetMonthActivitiesInputTenant.mapGetMonthActivitiesDtoInToGetMonthActivitiesInputTenant(serviceFields)
            const activities: Array<GetMonthActivitiesOutputTenant> = await this.tenantDao.loadActivitiesList(inputFields)
            return activities.map((activity) => GetMonthActivitiesDtoOutTenant.mapGetMonthActivitiesOutputTenantToGetMonthActivitiesDtoOutTenant(activity))
        } catch(e) {
            throw e
        }
    }


    /**
     * It retireves the details of the given activity.
     * @param activity_id 
     */
    getActivityDetails = async(activity_id: string, user_id: string): Promise<ActivityDetailsDtoOutTenant> => {
        try {
            const result: ActivityDetailsOutputTenant = await this.tenantDao.loadActivityDetails(activity_id, user_id)
            return ActivityDetailsDtoOutTenant.mapActivityDetailsOutputTenantToActivityDetailsOutputTenant(result)
        } catch(e) {
            throw e
        }
    }



    /**
     * This service is used to registrer recording the attending or cancelling it.
     */
    updateActivityAttendance = async(serviceFields: UpdateAttendanceDtoInTenant): Promise<void> => {
        try {
            const queryFields = UpdateAttendanceActivityInputTenant.mapUpdateAttendanceDtoInTenantToUpdateAttendanceActivityInputTenant(serviceFields)
            await this.tenantDao.updateAttendanceActivity(queryFields)
        } catch(e) {
            throw e
        }
    }


    /**
     * It is used to retrieve the list of requests.
     * @param user_id 
     * @returns 
     */
    retrieveServicesRequestHistory = async(user_id: string): Promise<Array<ServicesHistoryDtoOutTenant>> => {
        try {
            const outputs = await this.tenantDao.loadServicesRequestHistory(user_id)
            return outputs.map((output) => ServicesHistoryDtoOutTenant.mapServicesHistoryOutputTenantToServicesHistoryDtoOutTenant(output))
        } catch(e) {
            throw e
        }
    }


    /**
     * This service is used to submit a request for cleaning the apartment.
     */
    submitCleanHouse = async(serviceFields: SubmitCleaningServiceDtoInTenant): Promise<number> => {
        try {
            let tenant_lease_id = await this.tenantDao.getTenantLeaseId(serviceFields.user_id)
            if (tenant_lease_id !== -1) {
                const queryInputs = SubmitCleaningServiceInputTenant.mapSubmitCleaningServiceDtoInTenantToSubmitCleaningServiceInputTenant(serviceFields, tenant_lease_id)
                
                const results = await Promise.all([
                    Promise.resolve(await this.tenantDao.submitCleanHouse(queryInputs)),
                    Promise.resolve(await this.tenantDao.loadHomeDetails4Admin(tenant_lease_id, serviceFields.user_id))
                ])
                const tenantUnitInfo: TenantHomeDetails4AdminOutputTenant = results[1]
                this.notifyService.notifyRequestCleaningService(results[0].toString(), tenantUnitInfo.user_email, tenantUnitInfo.lon, tenantUnitInfo.lat, 
                    tenantUnitInfo.apartment_name, tenantUnitInfo.unit_id, serviceFields.prefered_date, serviceFields.notes)
                return results[0]
            } else {
                throw new Error()
            }
            
        } catch(e) {
            throw e
        }
    }


    /**
     * This service is used to submit a request for fixing plumbing issues.
     */
    submitPlumbing = async(serviceFields: SubmitPlumbingServiceDtoInTenant): Promise<number> => {
        try {
            let tenant_lease_id = await this.tenantDao.getTenantLeaseId(serviceFields.user_id)
            if (tenant_lease_id !== -1) {
                const queryInputs = SubmitPlumbingServiceInputTenant.mapSubmitPlumbingServiceDtoInTenantToSubmitPlumbingServiceInputTenant(serviceFields, tenant_lease_id)
                const results = await Promise.all([
                    Promise.resolve(await this.tenantDao.submitPlumbing(queryInputs)),
                    Promise.resolve(await this.tenantDao.loadHomeDetails4Admin(tenant_lease_id, serviceFields.user_id))
                ])
                const tenantUnitInfo: TenantHomeDetails4AdminOutputTenant = results[1]
                this.notifyService.notifyRequestPlumbingService(results[0].toString(), tenantUnitInfo.user_email, tenantUnitInfo.lon, tenantUnitInfo.lat, 
                    tenantUnitInfo.apartment_name, tenantUnitInfo.unit_id, serviceFields.prefered_date, serviceFields.room, 
                    serviceFields.category, serviceFields.describtion, serviceFields.notes)
                return results[0]
            } else {
                throw new Error()
            }
            
        } catch(e) {
            throw e
        }
    }


    /**
     * This service is used to submit a request for fixing electrcian issues.
     */
    submitElectrician = async(serviceFields: SubmitElectrcianServiceDtoInTenant): Promise<number> => {
        try {
            let tenant_lease_id = await this.tenantDao.getTenantLeaseId(serviceFields.user_id)
            if (tenant_lease_id !== -1) { 
                const queryInputs = SubmitElectricianServiceInputTenant.mapSubmitElectrcianServiceDtoInTenantToSubmitElectricianServiceInputTenant(serviceFields, tenant_lease_id)
            
                const results = await Promise.all([
                    Promise.resolve(await this.tenantDao.submitElectrcian(queryInputs)),
                    Promise.resolve(await this.tenantDao.loadHomeDetails4Admin(tenant_lease_id, serviceFields.user_id))
                ])
                const tenantUnitInfo: TenantHomeDetails4AdminOutputTenant = results[1]
                this.notifyService.notifyRequestElectricianService(results[0].toString(), tenantUnitInfo.user_email, tenantUnitInfo.lon, tenantUnitInfo.lat, 
                    tenantUnitInfo.apartment_name, tenantUnitInfo.unit_id, serviceFields.prefered_date, serviceFields.room, 
                    serviceFields.category, serviceFields.describtion, serviceFields.notes)
                return results[0]
            } else {
                throw new Error()
            }
            
        } catch(e) {
            throw e
        }
    }


    /**
     * It is used to retrieves the deatils of the current home details.
     */
    getTeantHomeDetails = async(user_id: string): Promise<TenantHomeDetailsDtoOutTenant> => {
        try {
            let tenant_lease_id = await this.tenantDao.getTenantLeaseId(user_id)
            if (tenant_lease_id !== -1) {
                const output: TenantHomeDetailsOutputTenant = await this.tenantDao.loadHomeDetails(tenant_lease_id, user_id)
                return TenantHomeDetailsDtoOutTenant.mapSearchUnitsOutputTenantToTenantHomeDetailsDtoOutTenant(output)
            } else {
                throw new Error()
            }
            
        } catch(e) {
            throw e
        }
    }

}