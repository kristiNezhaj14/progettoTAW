import * as mongoose from 'mongoose';
declare class Config {
    db: mongoose.Connection;
    private static instance;
    constructor(db: mongoose.Connection);
    static getInstance(): Config;
}
export { Config, mongoose };
