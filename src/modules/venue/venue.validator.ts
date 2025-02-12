import Joi from 'joi';

import { NewVenue } from './venue.interfaces';

//keyof extract all property names (keys) from NewVenue
const createVenueBody: Record<keyof NewVenue, any> = {
    name: Joi.string().required(),
    phone: Joi.string().required(),
    type: Joi.string().required(),
    address: Joi.string().required,
};

export const createVenueValidator = {
    body: Joi.object().keys(createVenueBody),
};