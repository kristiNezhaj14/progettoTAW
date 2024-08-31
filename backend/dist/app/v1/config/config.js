"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
class Configuration {
    constructor() {
        //just a placeholder
    }
    /**
     * I need this because once i create a connection it isn't ready and i can instanciate it in the constructor
     * @param dbConnection
     */
    setDbConnection(dbConnection) {
        this.db = dbConnection;
    }
    getDbConnection() {
        return this.db;
    }
}
exports.Configuration = Configuration;
const ConfigV1 = new Configuration();
exports.default = ConfigV1;
//# sourceMappingURL=config.js.map