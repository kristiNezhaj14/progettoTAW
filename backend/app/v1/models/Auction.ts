import { Document, mongo, Mongoose, Schema, Model  } from 'mongoose';
import ConfigV1 from '../config/config';

/*
//todo da capire come gestire università e corsi
export interface UniversityInterface extends Document {
    name: string
}

export interface CourseInterface extends Document {
    name: string,
    university: UniversityInterface,
    isClosed(): boolean;
    isOpened(): boolean;
}


export interface AuctionInterface extends Document {
    title: string,
    authors: Array<string>,
    category: Array<string>,
    courses: Array<CourseInterface>,
    ISBN: string,
    region: string,
    createdAt: Date,
    validUntil: Date,

    isClosed(): boolean;
    isOpened(): boolean;
}


const auctionSchema = new Schema({
    title : { type: String, required: true },
    picture: { type: String },
    authors: { type: Array<String>, required: true },
    category: { type: Array<String>, required: true },
    courses: { type: Array, required: true },
    ISBN: { type: String, required: true },
    region: { },
    seller: { type: Schema.Types.ObjectId, required: true, ref: 'User'},
    createdAt: { type: Date },
    validUntil: { type: Date },
});

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
} */