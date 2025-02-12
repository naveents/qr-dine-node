import mongoose, { Model } from "mongoose";

export interface IVenue{
    name: string;
    type: string; //mall, food-court
    address: string;
    phone: string;
}

export interface IVenueDoc extends IVenue, Document { }
export interface IVenueModel extends Model<IVenueDoc> {
    isNameAlreadyTaken(name: string, excludeId?: mongoose.Types.ObjectId): Promise<boolean>;
}

//Pick all keys from IVenue
export type NewVenue = Pick<IVenue, keyof IVenue>;
