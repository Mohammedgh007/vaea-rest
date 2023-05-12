"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchUnitsDtoOutTenant = void 0;
/**
 * It represents the output fields of tenantService.searchUnit
 */
class SearchUnitsDtoOutTenant {
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
SearchUnitsDtoOutTenant.mapSearchUnitsOutputTenantToSearchUnitsDtoOutTenant = (daoResult) => {
    return new SearchUnitsDtoOutTenant(daoResult.unit_id, daoResult.unit_type, daoResult.district, daoResult.bedroms, daoResult.bathrooms, daoResult.urls, daoResult.listing_title, daoResult.price);
};
exports.SearchUnitsDtoOutTenant = SearchUnitsDtoOutTenant;
