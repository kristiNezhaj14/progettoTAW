import { Config, mongoose } from './../config/config';

const db_connection = Config.getInstance().db;

export interface UserObject extends mongoose.Document {
    id: mongoose.ObjectId,
    name: string,
    roles: string[],
    createdAt: mongoose.Date,
};

export interface TableObject {
    id: mongoose.ObjectId,
    desription: string,
    name: string,
};

export interface TableOccupationObject {
    id: mongoose.ObjectId,
    tableId: TableObject,
    numberOfPeople: number,
    createdAt: mongoose.Date,
    leavedAt: mongoose.Date,
};

export interface ProductObject {
    id: mongoose.ObjectId,
    name: string,
    description: string,
    tags: string[],
};

export interface OrderObject {
    //todo
};

export interface ReceiptObject {
    //todo
};

export interface TagObject {
    name: string
};

var user = db_connection.model('User', new mongoose.Schema({
    //todo
}));

user.schema.methods.createUser = function(){

};

let table = db_connection.model('Table', new mongoose.Schema({

}));

let product = db_connection.model('Product', new mongoose.Schema({

}));

let order = db_connection.model('Order', new mongoose.Schema({

}));

let receipt = db_connection.model('Receipt', new mongoose.Schema({

}));


let tags =  db_connection.model('Tags', new mongoose.Schema({
    
}));


export {
    user,
    table,
    product,
    order,
    receipt,
    tags
}