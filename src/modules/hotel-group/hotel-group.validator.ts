import Joi from 'joi';

import { NewHotelGroup } from './hotel-group.interfaces';

const createHotelGroupBody: Record<keyof NewHotelGroup, any> = {
    name: Joi.string().required(),
    phone: Joi.string().required(),
    location: Joi.string().required()
};

export const createHotelGroupValidator = {
    body: Joi.object().keys(createHotelGroupBody),
};