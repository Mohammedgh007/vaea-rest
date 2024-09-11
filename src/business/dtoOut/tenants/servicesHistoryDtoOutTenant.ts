
import { ServicesHistoryOutputTenant } from "../../../dataAccess/outputs/tenants/servicesHistoryOutputTenant"

/**
 * It represents the output fields of tenantService.retrieveServicesRequestHistory
 */
export class ServicesHistoryDtoOutTenant {

    request_id: string
    request_type: string // either CLEANING, PLUMBING, ELECTRICIAN
    status: string // either PENDING, SCHEDULED, CONCLUDED 
    order_date: Date 
    appointment_date: Date


    
    constructor(
        request_id: string,
        request_type: string,
        status: string,
        order_date: Date,
        appointment_date: Date
    ) {
        this.request_id = request_id 
        this.request_type = request_type
        this.status = status 
        this.order_date = order_date
        this.appointment_date = appointment_date
    }  


    static mapServicesHistoryOutputTenantToServicesHistoryDtoOutTenant = (daoResult: ServicesHistoryOutputTenant): ServicesHistoryDtoOutTenant => {
        
        return new ServicesHistoryDtoOutTenant(
            daoResult.request_id,
            daoResult.request_type,
            daoResult.status,
            daoResult.order_date,
            daoResult.appointment_date,
        )
    }
}