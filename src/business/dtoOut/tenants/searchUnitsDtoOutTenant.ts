import { SearchUnitsOutputTenant } from "../../../dataAccess/outputs/tenants/searchUnitsOutputTenant"

/**
 * It represents the output fields of tenantService.searchUnit
 */
export class SearchUnitsDtoOutTenant {

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


    static mapSearchUnitsOutputTenantToSearchUnitsDtoOutTenant = (daoResult: SearchUnitsOutputTenant): SearchUnitsDtoOutTenant => {

        return new SearchUnitsDtoOutTenant(
            daoResult.unit_id,
            daoResult.unit_type,
            daoResult.district,
            daoResult.gender,
            daoResult.lat,
            daoResult.lon,
            daoResult.bedroms,
            daoResult.bathrooms,
            daoResult.capacity,
            daoResult.available_units,
            daoResult.urls,
            daoResult.listing_title,
            daoResult.price
        )
    }
}