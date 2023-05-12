/**
 * It represents the output fields of loadUnitDetails.
 */
export class UnitDetailsOutputTenant {

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


    static mapQueryResultToUnitDetailsOutputTenant = (result: any): UnitDetailsOutputTenant => {
        let urlsArr: Array<string> = result.urls.split(",")

        return new UnitDetailsOutputTenant(
            result.unit_id,
            result.building_id,
            result.unit_type,
            result.district,
            result.street,
            result.lat,
            result.lon,
            result.bedrooms,
            result.bathrooms,
            result.area,
            result.floor,
            urlsArr,
            result.listing_title,
            result.price
        )
    }
}