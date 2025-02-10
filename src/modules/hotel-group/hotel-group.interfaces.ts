import mongoose,{ Document, Model } from "mongoose";

export interface IHotelGroup {
    name: string;
    slug: string;
    phone: string;
    location: string | null;
}

export interface IHotelGroupDoc extends IHotelGroup, Document {}

export interface IHotelGroupModel extends Model<IHotelGroupDoc> {
    isNameAlreadyTaken(name: string, excludeUserId?: mongoose.Types.ObjectId): Promise<boolean>;
}

export type NewHotelGroup = Omit<IHotelGroup, 'slug'>;
