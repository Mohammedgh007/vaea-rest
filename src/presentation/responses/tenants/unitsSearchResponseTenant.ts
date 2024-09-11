import { SearchUnitsDtoOutTenant } from "../../../business/dtoOut/tenants/searchUnitsDtoOutTenant"
import { SearchUnitsOutputTenant } from "../../../dataAccess/outputs/tenants/searchUnitsOutputTenant"

/**
 * It represents the output fields of tenantRouter.searchUnit
 */
export class SearchUnitsResponseTenant {

    unit_id: number
    unit_type: string // it must be either PRIVATE or SHARED
    district: string
    gender: string // must be either MALE or FEMALE
    lat: number 
    lon: number
    bedroms: string
    bathrooms: string
    capacity: number // total number of units in a shared apartment.
    available_units: number // how many available out of capacity
    urls: Array<string>
    listing_title: string
    price: number


    constructor(
        unit_id: number,
        unit_type: string , 
        district: string,
        gender: string,
        lat: number,
        lon: number,
        bedroms: string,
        bathrooms: string,
        capacity: number,
        available_units: number,
        urls: Array<string>,
        listing_title: string,
        price: number
    ) {
        this.unit_id = unit_id
        this.unit_type = unit_type
        this.district = district
        this.gender = gender
        this.lat = lat 
        this.lon = lon
        this.bedroms = bedroms
        this.bathrooms = bathrooms
        this.capacity = capacity
        this.available_units = available_units
        this.urls = urls
        this.listing_title = listing_title
        this.price = price
    }


    static mapSearchUnitsDtoOutTenantToSearchUnitsResponseTenant = (serviceResult: SearchUnitsDtoOutTenant): SearchUnitsResponseTenant => {

        return new SearchUnitsResponseTenant(
            serviceResult.unit_id,
            serviceResult.unit_type,
            serviceResult.district,
            serviceResult.gender,
            serviceResult.lat,
            serviceResult.lon,
            serviceResult.bedroms,
            serviceResult.bathrooms,
            serviceResult.capacity,
            serviceResult.available_units,
            serviceResult.urls,
            serviceResult.listing_title,
            serviceResult.price
        )
    }
}