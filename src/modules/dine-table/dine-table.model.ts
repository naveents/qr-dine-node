import mongoose from "mongoose";
import { IDineTableDoc, IDineTableModel } from "./dine-table.interfaces";
import { Hotel } from "../hotel-group/hotel";
import { Venue } from "../venue";

const DineTableSchema = new mongoose.Schema<IDineTableDoc, IDineTableModel>({
    hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Hotel,
        default: null
    },
    venueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Venue,
        default: null
    },
    tableNumber: {
        type: String,
        required: true,
        index: true,
    },
    tableName: {
        type: String,
        default: null
    },
    isShared: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

//tableNumber is unique per hotel or venue
DineTableSchema.index(
    { tableNumber: 1, hotelId: 1, venueId: 1 },
    { unique: true, sparse: true }
);

const DineTable = mongoose.model<IDineTableDoc, IDineTableModel>("DineTable", DineTableSchema);
export default DineTable;

