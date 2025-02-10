import mongoose, { Document, Model, ObjectId } from "mongoose";

export interface IHotel {
    name: string;
    phone: string;
    email: String;
    slug: string;
    hotelGroup: ObjectId | null;
    identity: string;
    location: string;
    city: string | null;
    state: string | null;
    timeZone: string | null;
    open: boolean;
    openHours: Text;

}
//single document
export interface IHotelDoc extends IHotel, Document {}
//collection of documents
export interface IHotelModel extends Model<IHotelDoc>{
        isNameAlreadyTaken(name: string, excludeUserId?: mongoose.Types.ObjectId): Promise<boolean>;    
}

//structure of hotel object, omit is a typescript utitlity that creates a new type by removing  slug and identity from IHotel
export type NewHotel = Omit<IHotel, 'slug' | 'identity'>;