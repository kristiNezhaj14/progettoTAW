import { mongoose } from './../config/config';
export interface UserObject extends mongoose.Document {
    id: mongoose.ObjectId;
    name: string;
    surname: string;
    password: string;
    email: string;
    roles: string[];
    createdAt: mongoose.Date;
}
declare var user: mongoose.Model<{
    createdAt: Date;
    roles: any[];
    name?: string | null | undefined;
    email?: string | null | undefined;
    surname?: string | null | undefined;
    password?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: Date;
    roles: any[];
    name?: string | null | undefined;
    email?: string | null | undefined;
    surname?: string | null | undefined;
    password?: string | null | undefined;
}> & {
    createdAt: Date;
    roles: any[];
    name?: string | null | undefined;
    email?: string | null | undefined;
    surname?: string | null | undefined;
    password?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    createdAt: Date;
    roles: any[];
    name?: string | null | undefined;
    email?: string | null | undefined;
    surname?: string | null | undefined;
    password?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: Date;
    roles: any[];
    name?: string | null | undefined;
    email?: string | null | undefined;
    surname?: string | null | undefined;
    password?: string | null | undefined;
}>> & mongoose.FlatRecord<{
    createdAt: Date;
    roles: any[];
    name?: string | null | undefined;
    email?: string | null | undefined;
    surname?: string | null | undefined;
    password?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
export { user, mongoose };
