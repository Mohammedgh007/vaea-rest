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

/**
 * This file handles the business logic for tentant request.
 */
export class TenantService {

    tenantDao: TenantDAO

    constructor() {
        this.tenantDao = new TenantDAO()
    }

    // It handles send-otp request
    sendOtp = async (serviceFields: SendOTPDtoInTenant) => {
        try {
            const otpCode: string = await this.tenantDao.saveOTPCode(SaveOTPCodeInputTenant.mapSendOTPDtoInTenantToSaveOTPCodeInputTenant(serviceFields))
            
            const text: string = `Your otp is ${otpCode}`
            EmailManager.sendNotificationEmail(serviceFields.email_address, "Regsitration OTP", text)
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
            console.log("in service", serviceFields, (serviceFields.profile_image !== null), (serviceFields.profile_image.mimetype.includes("image")))
            // upload image
            if(serviceFields.profile_image !== null && serviceFields.profile_image.mimetype.includes("image")) {
                fileUrl = await FileUploader.uploadProfileImage( serviceFields.profile_image )
                daoInputs.profile_image = fileUrl
            }
            console.log("innn", fileUrl);
            // add tenant
            const insertedId: number = await this.tenantDao.verifyAndAddTenant(daoInputs)

            return new RegisterDtoOutTenant(fileUrl, insertedId)
        } catch(e) {
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
}