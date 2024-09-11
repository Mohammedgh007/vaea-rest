import { ServicesHistoryDtoOutTenant } from "../../../business/dtoOut/tenants/servicesHistoryDtoOutTenant"
import { SignInDtoOutTenant } from "../../../business/dtoOut/tenants/signInDtoOutTenant"

// It representds the fields in data within the response of Tenant.getTenantServicesRequests
export class ServicesHistoryResponseTenant {

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


    static mapServicesHistoryResponseTenantTOServicesHistoryDtoOutTenant = (output: ServicesHistoryDtoOutTenant) => {
        return new ServicesHistoryResponseTenant(
            output.request_id,
            output.request_type,
            output.status,
            output.order_date,
            output.appointment_date,
        )
    }


    static getDummy(): Array<ServicesHistoryResponseTenant> { 
        return [
            new ServicesHistoryResponseTenant("1", "CLEANING", "PENDING", new Date("July 7, 2023 20:30:00"), new Date("June 12, 2023 20:30:00")),
            new ServicesHistoryResponseTenant("2", "PLUMBING", "SCHEDULED", new Date("July 7, 2023 20:30:00"), new Date("June 12, 2023 20:30:00")),
            new ServicesHistoryResponseTenant("3", "ELECTRICIAN", "CONCLUDED", new Date("July 7, 2023 20:30:00"), new Date("June 12, 2023 20:30:00")),
            new ServicesHistoryResponseTenant("7", "CLEANING", "CONCLUDED", new Date("July 7, 2023 20:30:00"), new Date("June 12, 2023 20:30:00")),
        ]
    }



}