import { RegisterRequestTenant } from "../../../presentation/requests/tenants/registerRequestTenant"
import { SubmitCleaningServiceRequestTenant } from "../../../presentation/requests/tenants/submitCleaningServiceRequestTenant"

/**
 * It represents the required fields of tenantService.submitCleanHouse
 */
export class SubmitCleaningServiceDtoInTenant {

    prefered_date: Date 
    notes: string // optional
    user_id: string

    constructor(
        prefered_date: Date,
        notes: string,
        user_id: string
    ) {
        this.prefered_date = prefered_date
        this.notes = notes
        this.user_id = user_id
    }
     

    static mapRSubmitCleaningServiceRequestTenantToSubmitCleaningServiceDtoInTenant(requestFields: SubmitCleaningServiceRequestTenant): SubmitCleaningServiceDtoInTenant {
        return new SubmitCleaningServiceDtoInTenant(
            requestFields.prefered_date,
            requestFields.notes,
            requestFields.user_id
            )
    }
}