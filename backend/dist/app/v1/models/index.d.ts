import { mongoose } from './../config/config';
export interface UserObject extends mongoose.Document {
    id: mongoose.ObjectId;
    name: string;
    roles: string[];
    createdAt: mongoose.Date;
}
export interface TableObject {
    id: mongoose.ObjectId;
    desription: string;
    name: string;
}
export interface TableOccupationObject {
    id: mongoose.ObjectId;
    tableId: TableObject;
    numberOfPeople: number;
    createdAt: mongoose.Date;
    leavedAt: mongoose.Date;
}
export interface ProductObject {
    id: mongoose.ObjectId;
    name: string;
    description: string;
    tags: string[];
}
export interface OrderObject {
}
export interface ReceiptObject {
}
export interface TagObject {
    name: string;
}
declare var user: mongoose.Model<{}, {}, {}, {}, mongoose.Document<unknown, {}, {}> & Required<{
    _id: unknown;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{}>> & mongoose.FlatRecord<{}> & Required<{
    _id: unknown;
}>>>;
declare let table: mongoose.Model<{}, {}, {}, {}, mongoose.Document<unknown, {}, {}> & Required<{
    _id: unknown;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{}>> & mongoose.FlatRecord<{}> & Required<{
    _id: unknown;
}>>>;
declare let product: mongoose.Model<{}, {}, {}, {}, mongoose.Document<unknown, {}, {}> & Required<{
    _id: unknown;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{}>> & mongoose.FlatRecord<{}> & Required<{
    _id: unknown;
}>>>;
declare let order: mongoose.Model<{}, {}, {}, {}, mongoose.Document<unknown, {}, {}> & Required<{
    _id: unknown;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{}>> & mongoose.FlatRecord<{}> & Required<{
    _id: unknown;
}>>>;
declare let receipt: mongoose.Model<{}, {}, {}, {}, mongoose.Document<unknown, {}, {}> & Required<{
    _id: unknown;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{}>> & mongoose.FlatRecord<{}> & Required<{
    _id: unknown;
}>>>;
declare let tags: mongoose.Model<{}, {}, {}, {}, mongoose.Document<unknown, {}, {}> & Required<{
    _id: unknown;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{}>> & mongoose.FlatRecord<{}> & Required<{
    _id: unknown;
}>>>;
export { user, table, product, order, receipt, tags };
