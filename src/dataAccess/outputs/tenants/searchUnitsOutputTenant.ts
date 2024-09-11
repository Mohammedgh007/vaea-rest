/**
 * It represents the output fields of tenantDAO.searchUnit
 */
export class SearchUnitsOutputTenant {

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


    static mapQueryResultToSearchUnitsOutputTenant = (result: any): SearchUnitsOutputTenant => {
        let urlsArr: Array<string> = result.urls.split(",")

        return new SearchUnitsOutputTenant(
            result.id,
            result.unit_type,
            result.district,
            result.gender,
            result.lat,
            result.lon,
            result.bedrooms,
            result.bathrooms,
            result.capacity,
            result.available_units,
            urlsArr,
            result.listing_title,
            result.price
        )
    }
}