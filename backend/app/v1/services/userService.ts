import models = require('../models');

const createUser = async (data: models.UserObject) => {
    try {
        let result = await models.user.create(data);
        return true;
    } catch (e){
        return false;
    }
};

const updateUser = async (id: any, data: models.UserObject) => {
    try {
        let result = await models.user.findOneAndUpdate({ id: id }, data);
        return true;
    } catch (e){
        return false;
    }
}

const deleteUser = async (id: string)  =>  {
    try {
        await models.user.findByIdAndDelete({id: id});
        return true;
    } catch (e){
        return false;
    }
}

/*
const login = async (email: string, password: string) => {
    await models.
}*/


export {
    createUser, deleteUser, updateUser
};