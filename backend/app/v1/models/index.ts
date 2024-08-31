import { Config, mongoose } from './../config/config';

const db_connection = Config.getInstance().db;

export interface UserObject extends mongoose.Document {
    id: mongoose.ObjectId,
    name: string,
    surname: string,
    password: string,
    email: string,
    roles: string[],
    createdAt: mongoose.Date
};

var user = db_connection.model('User', new mongoose.Schema({
    //todo
    name: String,
    surname: String,
    password: String,
    email: String,
    roles: Array,
    createdAt: { type: Date, default: Date.now }
}));

user.schema.methods.createUser = function(){
    console.log(`Create user called!`);
};

export {
    user, mongoose
};