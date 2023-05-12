"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchUnitsResponseTenant = void 0;
/**
 * It represents the output fields of tenantRouter.searchUnit
 */
class SearchUnitsResponseTenant {
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
SearchUnitsResponseTenant.mapSearchUnitsDtoOutTenantToSearchUnitsResponseTenant = (serviceResult) => {
    return new SearchUnitsResponseTenant(serviceResult.unit_id, serviceResult.unit_type, serviceResult.district, serviceResult.bedroms, serviceResult.bathrooms, serviceResult.urls, serviceResult.listing_title, serviceResult.price);
};
exports.SearchUnitsResponseTenant = SearchUnitsResponseTenant;
