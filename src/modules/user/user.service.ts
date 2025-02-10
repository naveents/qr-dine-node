
import User from "./user.model";
import { NewCreatedUser, IUserDoc } from "./user.interfaces";
import httpStatus from 'http-status';

/**
 * Create a user
 * @param {NewCreatedUser} userBody
 * @returns {Promise<IUserDoc>}
 */
export const createUser = async (userBody: NewCreatedUser): Promise<IUserDoc> => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new Error('Email already taken');
    }
    return User.create(userBody);
};