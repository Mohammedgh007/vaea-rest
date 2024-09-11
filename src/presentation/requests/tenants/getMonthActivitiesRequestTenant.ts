

/**
 * This class represents the fields for tenantRouter.getMonthActivities
 */
export class GetMonthActivitiesRequestTenant {

    month: number // must be between 1-12 
    city: string // must be either RIYADH, KHOBAR, JEDDAH

    constructor(
        month: number ,
        city: string
    ) {
        this.month = month 
        this.city = city
    }


    static mapJsonToGetMonthActivitiesRequestTenant(req: any): GetMonthActivitiesRequestTenant {
        return new GetMonthActivitiesRequestTenant(
            Number.parseInt(req.query.month),
            req.query.city,
        )
        
    }
}