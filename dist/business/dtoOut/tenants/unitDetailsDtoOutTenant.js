"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitDetailsDtoOutTenant = void 0;
/**
 * It represents the output fields of tenantService.retireveUnitDetail
 */
class UnitDetailsDtoOutTenant {
    constructor(unit_id, building_id, unit_type, district, street, lat, lon, bedroms, bathrooms, area, floor, urls, listing_title, price) {
        this.unit_id = unit_id;
        this.building_id = building_id;
        this.unit_type = unit_type;
        this.district = district;
        this.street = street;
        this.lat = lat;
        this.lon = lon;
        this.bedroms = bedroms;
        this.bathrooms = bathrooms;
        this.area = area;
        this.floor = floor;
        this.urls = urls;
        this.listing_title = listing_title;
        this.price = price;
    }
}
UnitDetailsDtoOutTenant.mapUnitDetailsOutputTenantToUnitDetailsDtoOutTenant = (queryResult) => {
    return new UnitDetailsDtoOutTenant(queryResult.unit_id, queryResult.building_id, queryResult.unit_type, queryResult.district, queryResult.street, queryResult.lat, queryResult.lon, queryResult.bedroms, queryResult.bathrooms, queryResult.area, queryResult.floor, queryResult.urls, queryResult.listing_title, queryResult.price);
};
exports.UnitDetailsDtoOutTenant = UnitDetailsDtoOutTenant;
