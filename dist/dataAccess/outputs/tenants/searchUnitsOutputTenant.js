"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchUnitsOutputTenant = void 0;
/**
 * It represents the output fields of tenantDAO.searchUnit
 */
class SearchUnitsOutputTenant {
    constructor(unit_id, unit_type, district, bedroms, bathrooms, urls, listing_title, price) {
        this.unit_id = unit_id;
        this.unit_type = unit_type;
        this.district = district;
        this.bedroms = bedroms;
        this.bathrooms = bathrooms;
        this.urls = urls;
        this.listing_title = listing_title;
        this.price = price;
    }
}
SearchUnitsOutputTenant.mapQueryResultToSearchUnitsOutputTenant = (result) => {
    let urlsArr = result.urls.split(",");
    return new SearchUnitsOutputTenant(result.id, result.unit_type, result.district, result.bedrooms, result.bathrooms, urlsArr, result.listing_title, result.price);
};
exports.SearchUnitsOutputTenant = SearchUnitsOutputTenant;
