"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitDetailsOutputTenant = void 0;
/**
 * It represents the output fields of loadUnitDetails.
 */
class UnitDetailsOutputTenant {
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
UnitDetailsOutputTenant.mapQueryResultToUnitDetailsOutputTenant = (result) => {
    let urlsArr = result.urls.split(",");
    return new UnitDetailsOutputTenant(result.unit_id, result.building_id, result.unit_type, result.district, result.street, result.lat, result.lon, result.bedrooms, result.bathrooms, result.area, result.floor, urlsArr, result.listing_title, result.price);
};
exports.UnitDetailsOutputTenant = UnitDetailsOutputTenant;
