import mongoose from "mongoose";
import { IVenueDoc, IVenueModel } from './venue.interfaces';
import { locationTypes } from "../../config/location-types";

/** MALL, Food Court */
const VenueSchema = new mongoose.Schema<IVenueDoc, IVenueModel>({
    name: {
        type: String,
        index: true,
        trim: true,
        required: true,
    },
    phone: {
        type: String,
        trim: true,
        required: false
    },
    address: {
        type: String,
        trim: true,
        required: false
    },
    type: {
        type: String,
        enum: locationTypes,
        default: 'mall', //mall or food-court
    },
},{
    timestamps: true
});


VenueSchema.static('isNameAlreadyTaken', async function (name: string, excludeId: mongoose.ObjectId): Promise<boolean> {
    const venue = await this.findOne({ name, _id: { $ne: excludeId } });
    return !!venue;
});

const  Venue = mongoose.model<IVenueDoc, IVenueModel>('Venue', VenueSchema);
export default Venue;