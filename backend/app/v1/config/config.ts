import * as mongoose from 'mongoose';

class Config {

    private static instance: Config;

    constructor(
        public db: mongoose.Connection,
    ){
        if(typeof Config.instance != undefined){
            throw "Config can't be instanciated more than once!";
        }

        Config.instance = this;
    }

    static getInstance(): Config {
        if(typeof Config.instance == undefined){
            throw "Config never instanciated";
        }
        
        return Config.instance; 
    }
}

export {
    Config,
    mongoose
};