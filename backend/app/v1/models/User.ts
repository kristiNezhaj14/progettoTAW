import { Document, mongo, Mongoose, Schema, Model } from 'mongoose';
import ConfigV1 from '../config/config';

const bcrypt = require('bcrypt');
const HASH_ROUNDS = 10;

export interface UserInterface extends Document {
    name: string;
    surname: string,
    email: string;
    password: string;
    role: string,
    createdAt?: Date, //not required on save but exists after user retrieve

    isModerator(): boolean;
    isStudent(): boolean;
    comparePassword(candidatePassword: string):  boolean;
}

const userSchema = new Schema({
    name: { type: String, required: true},
    surname: { type: String, required: true},
    email: { type: String, required: true, index: true , unique: true},
    password: { type: String, required: true},
    role: { type: String, lowercase: true, required: true, default: 'student'},
    createdAt: { type: Date, default: Date.now }
});


const hashPasswordMiddleware = async function (next) {
    console.log(`Called hashPasswordMiddleware`);

    const thisObj = this as UserInterface;

    if (!thisObj.isModified('password')) { //if the password is the same don't update it
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(HASH_ROUNDS);
        thisObj.password = await bcrypt.hash(thisObj.password, salt);
        return next();
    } catch (err: any) {
        return next(err);
    }
};

userSchema.pre<UserInterface>('save', hashPasswordMiddleware);

//Useful for authentication
userSchema.methods.comparePassword = async function(candidatePassword: string) {
    let result = await bcrypt.compare(candidatePassword, this.password);
    return result;
};

userSchema.methods.isModerator = function(){
    return this.role === 'moderator';
}

userSchema.methods.isStudent =  function(){
    return this.role === 'student';
}

export function getSchema(): Schema { return userSchema; }

// Mongoose Model
let userModel: any = null;  // This is not exposed outside the model

export function getModel() : Model< UserInterface >  { // Return Model as singleton
    if( !userModel ) {
        userModel = ConfigV1.getDbConnection().model('User', getSchema() )
    }

    return userModel;
}