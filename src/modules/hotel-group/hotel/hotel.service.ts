import { ApiError } from "../../errors";
import { IHotelDoc, NewHotel } from "./hotel.interfaces";
import httpStatus from 'http-status';
import Hotel from "./hotel.model";
import paginate, { QueryResult } from "../../paginate/paginate";

export const createHotel = async (data: NewHotel) => {

    try {
        if (await Hotel.isNameAlreadyTaken(data.name)) {
            throw new ApiError(httpStatus.BAD_GATEWAY, "Hotel name already taken!");
        }

        const hotel = new Hotel(data);
        return await hotel.save();

    } catch (error: any) {
        throw new ApiError(error.statusCode ?? httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
};


export const queryHotels = async (
    filter: Record<string, any>,
    page: number = 1,
    limit: number = 10
): Promise<QueryResult<IHotelDoc>> => {
    return await paginate<IHotelDoc>(Hotel, filter, page, limit);
};