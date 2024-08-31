import * as mongoose from 'mongoose';

export class Configuration {
    private db: mongoose.Connection;

    constructor(
        
    ){
        //just a placeholder
    }

    /**
     * I need this because once i create a connection it isn't ready and i can instanciate it in the constructor
     * @param dbConnection 
     */
    setDbConnection(dbConnection: mongoose.Connection){
        this.db = dbConnection;
    }

    getDbConnection(){
        return this.db;
    }
}

const ConfigV1 = new Configuration();
export default ConfigV1;