import { UnitDetailsOutputTenant } from "../../../dataAccess/outputs/tenants/unitDetailsOutput.tenant"

/**
 * It represents the output fields of tenantService.retireveUnitDetail
 */
export class UnitDetailsDtoOutTenant {

    unit_id: number
    building_id: number
    unit_type: string // it must be either PRIVATE or SHARED
    district: string
    street: string
    lat: number 
    lon: number
    bedroms: string
    bathrooms: string
    area: number 
    floor: number
    urls: Array<string>
    listing_title: string
    price: number


    constructor(
        unit_id: number,
        building_id: number,
        unit_type: string , 
        district: string,
        street: string,
        lat: number ,
        lon: number,
        bedroms: string,
        bathrooms: string,
        area: number,
        floor: number,
        urls: Array<string>,
        listing_title: string,
        price: number
    ) {
        this.unit_id = unit_id
        this.building_id = building_id
        this.unit_type = unit_type
        this.district = district
        this.street = street
        this.lat = lat 
        this.lon = lon
        this.bedroms = bedroms
        this.bathrooms = bathrooms
        this.area = area 
        this.floor = floor
        this.urls = urls
        this.listing_title = listing_title
        this.price = price
    }


    static mapUnitDetailsOutputTenantToUnitDetailsDtoOutTenant = (queryResult: UnitDetailsOutputTenant): UnitDetailsDtoOutTenant => {

        return new UnitDetailsDtoOutTenant(
            queryResult.unit_id,
            queryResult.building_id,
            queryResult.unit_type,
            queryResult.district,
            queryResult.street,
            queryResult.lat,
            queryResult.lon,
            queryResult.bedroms,
            queryResult.bathrooms,
            queryResult.area,
            queryResult.floor,
            queryResult.urls,
            queryResult.listing_title,
            queryResult.price
        )
    }
}