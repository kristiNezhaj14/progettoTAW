import { Document, Schema, Model } from 'mongoose';
import ConfigV1 from '../config/config';

export interface ListingInterface extends Document {
    title: string;
    course: string;
    university: string;
    location: string;
    startPrice: number;
    reservePrice: number;
    duration: number;
    createdBy: string;
    createdAt?: Date; // Non richiesto per il salvataggio, ma presente dopo il recupero
    expiresAt: Date;
    author: string;
    edition: string;
    description?: string;
    coverImageUrl?: string;
}

const listingSchema = new Schema({
    title: { type: String, required: true },
    course: { type: String, required: true },
    university: { type: String, required: true },
    location: { type: String, required: true },
    startPrice: { type: Number, required: true },
    reservePrice: { type: Number, required: true },
    duration: { type: Number, required: true },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
    author: { type: String, required: true },
    edition: { type: String, required: true },
    description: { type: String },
    coverImageUrl: { type: String },
});

export function getSchema(): Schema {
    return listingSchema;
}

// Mongoose Model
let listingModel: any = null;

export function getModel(): Model<ListingInterface> {
    if (!listingModel) {
        listingModel = ConfigV1.getDbConnection().model('Listing', getSchema());
    }

    return listingModel;
}
