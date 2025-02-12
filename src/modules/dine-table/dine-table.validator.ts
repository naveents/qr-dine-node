import Joi from 'joi';
import { NewDineTable } from './dine-table.interfaces';


const createDineTableBody: Record<keyof NewDineTable, any> = {
    venueId: Joi.object().allow(null),
    hotelId: Joi.object().allow(null),
    tableName: Joi.string().allow(null),
    tableNumber: Joi.string().required(),
    isShared: Joi.boolean().default(false)
};

export const createDineTableValidator = {
    body: Joi.object().keys(createDineTableBody),
};