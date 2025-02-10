import mongoose, { Schema } from "mongoose";
import { IHotelGroupDoc, IHotelGroupModel } from './hotel-group.interfaces';
import { createSlug } from "../utils";

const HotelGroupSchema = new mongoose.Schema<IHotelGroupDoc, IHotelGroupModel>({
    name: {
        type: String,
        index: true,
        trim: true,
        required: true,
    },
    slug: {
        type: String,
        index: true
    },
    phone: {
        type: String,
        trim: true,
        required: false
    },
    location: {
        type: String,
        trim: true,
        required: false
    }

},
{
    timestamps: true
});


HotelGroupSchema.pre<IHotelGroupDoc>("save", async function (next) {
    if (!this.isModified("name")) return next();

    let slug = createSlug(this.name);

    let count = 1;
    while (await mongoose.models.HotelGroup.findOne({ slug })) {
        slug = `${createSlug(this.name)}-${count}`;
        count++;
    }

    this.slug = slug;
    next();
});


HotelGroupSchema.static('isNameAlreadyTaken', async function (name: string, excludeId: mongoose.ObjectId): Promise<boolean> {
    const hotelGroup = await this.findOne({ name, _id: { $ne: excludeId } });
    return !!hotelGroup;
});

const HotelGroup = mongoose.model<IHotelGroupDoc, IHotelGroupModel>('HotelGroup', HotelGroupSchema);

export default HotelGroup;