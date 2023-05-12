"use strict";
/**
 * This is the main the file of project. It is where the setup is done.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tenantRouter_1 = require("./presentation/routers/tenantRouter");
const configCoordinator_1 = require("./config/configCoordinator");
const app = (0, express_1.default)();
// handle project configuration
(0, configCoordinator_1.configProject)();
app.use(express_1.default.json());
app.use(express_1.default.static("./uploads"));
// setup routers
(0, tenantRouter_1.setupTenantRouter)();
app.use("/tenants", tenantRouter_1.tenantRouter);
app.listen(process.env.PORT, () => {
    console.log(`[Server]: I am running at https://localhost:${process.env.PORT}`);
});
