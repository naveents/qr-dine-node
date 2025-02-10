import Joi from 'joi';

import { NewHotel } from './hotel.interfaces';

const createHotelBody: Record<keyof NewHotel, any> = {
    name: Joi.string().required(),
    phone: Joi.string().required(),
    location: Joi.string().required(),
    city: Joi.string().allow(null),
    open: Joi.boolean().required(),
    openHours: Joi.string().required(),
    email: Joi.string().allow(null),
    hotelGroup: Joi.object().allow(null),
    state: Joi.string().allow(null),
    timeZone: Joi.string().allow(null)
};

export const createHotelValidator = {
    body: Joi.object().keys(createHotelBody),
};