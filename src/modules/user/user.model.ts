import mongoose from "mongoose";
import { IUserModel, IUserDoc } from './user.interfaces';
import { roles } from "../../config/roles";
import bcrypt from "bcryptjs";

//const UserSchema = new mongoose.Schema({
const UserSchema = new mongoose.Schema<IUserDoc, IUserModel>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    role: {
        type: String,
        enum: roles,
        default: 'developer',
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    active: {
        type: Boolean,
        default: true,
    }
},
    {
        timestamps: true
    }
)

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
UserSchema.static('isEmailTaken', async function (email: string, excludeUserId: mongoose.ObjectId): Promise<boolean> {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
});

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
UserSchema.method('isPasswordMatch', async function (password: string): Promise<boolean> {
    const user = this;
    return bcrypt.compare(password, user.password);
});

UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model<IUserDoc, IUserModel>('User', UserSchema);

export default User;
