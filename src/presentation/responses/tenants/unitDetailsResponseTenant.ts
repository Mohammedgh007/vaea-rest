import { UnitDetailsDtoOutTenant } from "../../../business/dtoOut/tenants/unitDetailsDtoOutTenant"
import { UnitDetailsOutputTenant } from "../../../dataAccess/outputs/tenants/unitDetailsOutput.tenant"

/**
 * It represents the output fields of tenantRouter.unitDetails
 */
export class UnitDetailsResponseTenant {

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


    static mapUnitDetailsOutputTenantToUnitDetailsResponseTenant = (serviceResult: UnitDetailsOutputTenant): UnitDetailsResponseTenant => {

        return new UnitDetailsResponseTenant(
            serviceResult.unit_id,
            serviceResult.building_id,
            serviceResult.unit_type,
            serviceResult.district,
            serviceResult.street,
            serviceResult.lat,
            serviceResult.lon,
            serviceResult.bedroms,
            serviceResult.bathrooms,
            serviceResult.area,
            serviceResult.floor,
            serviceResult.urls,
            serviceResult.listing_title,
            serviceResult.price
        )
    }
}