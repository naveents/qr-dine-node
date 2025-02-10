import mongoose from "mongoose";
import { IHotelDoc, IHotelModel } from './hotel.interfaces';
import HotelGroup from "../hotel-group.model";
import { createNanoId, createSlug } from "../../utils";

const IDENTITY_PREFIX = 'HTL';

const HotelSchema = new mongoose.Schema<IHotelDoc, IHotelModel>({

    name: {
        type: String,
        index: true,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        index: true,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    hotelGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: HotelGroup
    },
    slug: {
        type: String,
        unique: true,
        index: true
    },
    identity: {
        type: String,
        unique: true,
        index: true
    },
    location: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    timeZone: {
        type: String,
        required: true,
        default: "Asia/Kolkata"
    },
    open: {
        type: Boolean,
        default: false
    },
    openHours: {
        type: String,
        required: false
    }

});

//hook - hotel name already taken
HotelSchema.static('isNameAlreadyTaken', async function (name: string, excludeId: mongoose.ObjectId): Promise<boolean> {
    const hotel = await this.findOne({ name, _id: { $ne: excludeId } });
    return !!hotel;
});

//hook - pre save generate slug
HotelSchema.pre<IHotelDoc>("save", async function (next) {
    if (!this.isModified("name")) return next();

    let slug = createSlug(this.name);
    let identity = await createNanoId(5);

    let count = 1;
    while (await mongoose.models.HotelGroup.findOne({ slug })) {
        slug = `${createSlug(this.name)}-${count}`;
        count++;
    }

    this.slug = slug;
    this.identity = `${IDENTITY_PREFIX}${identity}`;
    next();
});



const Hotel = mongoose.model<IHotelDoc, IHotelModel>('Hotel', HotelSchema);
export default Hotel;