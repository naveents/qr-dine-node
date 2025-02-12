import { Document, Model, ObjectId } from "mongoose";

export interface IDineTable {
    hotelId: ObjectId | null;
    venueId: ObjectId | null;
    tableNumber: string;
    tableName: string | null;
    isShared: boolean;    
}

export interface IDineTableDoc extends IDineTable, Document {}
export interface IDineTableModel extends Model<IDineTableDoc>{}

export type NewDineTable  = Pick<IDineTable, keyof IDineTable>;