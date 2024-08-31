import models = require('../models');


const getUserInfo = async (id: string) => {
    let result = await models.user.findById( new models.mongoose.Types.ObjectId(id));
    return result;
};

const createUser = async (data: models.UserObject) => {
    try {
        console.log(`Create user:`, data);
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
    getUserInfo, createUser, deleteUser, updateUser
};