/**
 * It represents the output fields of tenantDAO.loadServicesRequestHistory
 */
export class ServicesHistoryOutputTenant {

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


    static mapQueryResultToServicesHistoryOutputTenant = (result: any, request_type: string): ServicesHistoryOutputTenant => {
        let orderDate: Date = new Date(result.order_date)
        orderDate.setHours(orderDate.getHours() + 3)
        let appointmentDate: Date = new Date(result.appointment_date)
        appointmentDate.setHours(appointmentDate.getHours() + 3)
        
        return new ServicesHistoryOutputTenant(
            result.request_id,
            request_type,
            result.status,
            orderDate,
            appointmentDate,
        )
    }
}