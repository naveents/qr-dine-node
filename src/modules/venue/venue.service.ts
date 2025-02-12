import Venue from "./venue.model";
import { NewVenue } from "./venue.interfaces";
import { ApiError } from "../errors";
import httpStatus from 'http-status';


export const createVenue = async (data: NewVenue) => {

    try {
        if (await Venue.isNameAlreadyTaken(data.name)) {
            throw new ApiError(httpStatus.BAD_REQUEST, `Venue name already taken`)
        }

        const venue = new Venue(data);
        return await venue.save();
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Error: ${error}`)
    }
}