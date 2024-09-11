
import { SubmitCleaningServiceDtoInTenant } from "../../../business/dtoIn/tenants/submitCleaningServiceDtoInTenant"

/**
 * It represents the required fields of tenantDAO.submitCleanHouse
 */
export class SubmitCleaningServiceInputTenant {

    prefered_date: Date 
    notes: string // optional
    user_id: string
    lease_id: number

    constructor(
        prefered_date: Date,
        notes: string,
        user_id: string,
        lease_id: number
    ) {
        this.prefered_date = prefered_date
        this.notes = notes
        this.user_id = user_id
        this.lease_id = lease_id
    }

    static mapSubmitCleaningServiceDtoInTenantToSubmitCleaningServiceInputTenant(serviceFields: SubmitCleaningServiceDtoInTenant, lease_id: number): SubmitCleaningServiceInputTenant {
        return new SubmitCleaningServiceInputTenant(
            serviceFields.prefered_date,
            serviceFields.notes,
            serviceFields.user_id,
            lease_id
            )
    }
}