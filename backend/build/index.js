"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const app_1 = require("./app");
const StaffRouter_1 = require("./Router/StaffRouter");
const ProgramRouter_1 = require("./Router/ProgramRouter");
(async () => {
    let retries = 5;
    while (retries) {
        try {
            console.log('Connecting...');
            await typeorm_1.createConnection();
            break;
        }
        catch (error) {
            console.log('Error while connecting to database', error);
            retries -= 1;
            console.log(`Retrying ${retries} times left`);
            await new Promise((res) => setTimeout(res, 5000));
        }
    }
    const appRouters = [
        new StaffRouter_1.default(),
        new ProgramRouter_1.default()
    ];
    const app = new app_1.default(appRouters, 9000);
    app.listen();
})();
//# sourceMappingURL=index.js.map