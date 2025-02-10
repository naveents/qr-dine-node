import mongoose,{ Document, Model } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: string;
    emailVerified: boolean;
    active: boolean;
}

//represents an individual document.
export interface IUserDoc extends IUser, Document {
    isPasswordMatch(password: string): Promise<boolean>;
}

//IuserModel represents the entire collection
export interface IUserModel extends Model<IUserDoc> {
    isEmailTaken(email: string, excludeUserId?: mongoose.Types.ObjectId): Promise<boolean>;
}

export type NewCreatedUser = Omit<IUser, 'emailVerified'>;