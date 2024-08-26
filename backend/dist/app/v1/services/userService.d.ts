import models = require('../models');
declare const createUser: (data: models.UserObject) => Promise<boolean>;
declare const updateUser: (id: any, data: models.UserObject) => Promise<boolean>;
declare const deleteUser: (id: string) => Promise<boolean>;
export { createUser, deleteUser, updateUser };
