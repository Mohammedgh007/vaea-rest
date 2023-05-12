/**
 * It represents the output fields of tenantDAO.searchUnit
 */
export class SearchUnitsOutputTenant {

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


    static mapQueryResultToSearchUnitsOutputTenant = (result: any): SearchUnitsOutputTenant => {
        let urlsArr: Array<string> = result.urls.split(",")

        return new SearchUnitsOutputTenant(
            result.id,
            result.unit_type,
            result.district,
            result.bedrooms,
            result.bathrooms,
            urlsArr,
            result.listing_title,
            result.price
        )
    }
}