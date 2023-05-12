import { SearchUnitsOutputTenant } from "../../../dataAccess/outputs/tenants/searchUnitsOutputTenant"

/**
 * It represents the output fields of tenantService.searchUnit
 */
export class SearchUnitsDtoOutTenant {

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


    static mapSearchUnitsOutputTenantToSearchUnitsDtoOutTenant = (daoResult: SearchUnitsOutputTenant): SearchUnitsDtoOutTenant => {

        return new SearchUnitsDtoOutTenant(
            daoResult.unit_id,
            daoResult.unit_type,
            daoResult.district,
            daoResult.bedroms,
            daoResult.bathrooms,
            daoResult.urls,
            daoResult.listing_title,
            daoResult.price
        )
    }
}