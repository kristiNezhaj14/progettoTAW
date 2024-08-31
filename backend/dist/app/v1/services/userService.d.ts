import models = require('../models');
declare const getUserInfo: (id: string) => Promise<(models.mongoose.Document<unknown, {}, {
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
    _id: models.mongoose.Types.ObjectId;
}) | null>;
declare const createUser: (data: models.UserObject) => Promise<boolean>;
declare const updateUser: (id: any, data: models.UserObject) => Promise<boolean>;
declare const deleteUser: (id: string) => Promise<boolean>;
export { getUserInfo, createUser, deleteUser, updateUser };
