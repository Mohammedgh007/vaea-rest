import { SearchUnitsDtoOutTenant } from "../../../business/dtoOut/tenants/searchUnitsDtoOutTenant"
import { SearchUnitsOutputTenant } from "../../../dataAccess/outputs/tenants/searchUnitsOutputTenant"

/**
 * It represents the output fields of tenantRouter.searchUnit
 */
export class SearchUnitsResponseTenant {

    unit_id: number
    unit_type: string // it must be either PRIVATE or SHARED
    district: string
    bedroms: string
    bathrooms: string
    urls: Array<string>
    listing_title: string
    price: number


    constructor(
        unit_id: number,
        unit_type: string , 
        district: string,
        bedroms: string,
        bathrooms: string,
        urls: Array<string>,
        listing_title: string,
        price: number
    ) {
        this.unit_id = unit_id
        this.unit_type = unit_type
        this.district = district
        this.bedroms = bedroms
        this.bathrooms = bathrooms
        this.urls = urls
        this.listing_title = listing_title
        this.price = price
    }


    static mapSearchUnitsDtoOutTenantToSearchUnitsResponseTenant = (serviceResult: SearchUnitsDtoOutTenant): SearchUnitsResponseTenant => {

        return new SearchUnitsResponseTenant(
            serviceResult.unit_id,
            serviceResult.unit_type,
            serviceResult.district,
            serviceResult.bedroms,
            serviceResult.bathrooms,
            serviceResult.urls,
            serviceResult.listing_title,
            serviceResult.price
        )
    }
}