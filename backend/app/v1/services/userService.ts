import mongoose, { Model, mongo } from "mongoose";
import * as Models from "../models";


const getUsersList = async (currentPage = 1, pagination = 0) => {
    let result = await Models.UserModel.getModel().find({});
    return result;
}

const getUserInfo = async (id: string) => {
    console.log("DIOCANEEEEEEEEEEE"+id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ObjectId format");
    }
    let result = await Models.UserModel.getModel().findById(new mongoose.Types.ObjectId(id));
    return result;
};






const createUser = async (data: Models.UserModel.UserInterface) => {
    return await Models.UserModel.getModel().create(data);
};

const getUserByEmail = async (email: string) => {
    let result = await Models.UserModel.getModel().findOne({ email: email });
    return result;
};

const updateUser = async (id: string, data) => {
    let user = await Models.UserModel.getModel().findById(id);

    //we need to do this approach instead of directly call UpdateOne because of the hashedpassword middleware
    //that cannot be called in pre('updateOne') by construction

    user.set(data);
    return await user.save();
    //return await user.updateOne(data);
}

const deleteUser = async (id: string)  =>  {
    try {
        await Models.UserModel.getModel().findByIdAndDelete(new mongoose.Types.ObjectId(id));
        return true;
    } catch (e){
        console.error(e);
        return false;
    }
}

const login = async (email: string, password: string) => {
    let user = await Models.UserModel.getModel().findOne( { email: email});
    let isValid = await user.comparePassword(password);
    return isValid;
}

export {
    getUserInfo, createUser, deleteUser, updateUser, getUsersList, getUserByEmail
};
