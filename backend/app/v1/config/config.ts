import * as mongoose from 'mongoose';

class Config {

    private static instance: Config;
    
    constructor(
        public db: mongoose.Connection,
    ){
        console.log(`Config configuration started...`);

        if(Config.instance !== null){
            throw "Config can't be instanciated more than once!";
        }

        Config.instance = this;
    }

    static getInstance(): Config {
        console.log(`Config get instance called`);
        if(typeof Config.instance === undefined || Config.instance === null){
            throw "Config never instanciated";
        }
        
        return Config.instance; 
    }
}

export {
    Config,
    mongoose
};