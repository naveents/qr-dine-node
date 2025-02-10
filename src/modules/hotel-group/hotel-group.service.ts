import { QueryResult } from '../paginate/paginate';
import { NewHotelGroup, IHotelGroupDoc } from './hotel-group.interfaces';
import HotelGroup from './hotel-group.model';
import paginate from '../paginate/paginate';
import { ApiError } from '../errors';
import httpStatus from 'http-status';

/**
 * Create a new hotel group
 */
export const createHotelGroup = async (data: NewHotelGroup): Promise<IHotelGroupDoc> => {
    try {
        // Check if name is already taken
        if (await HotelGroup.isNameAlreadyTaken(data.name)) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Hotel group name already taken");
        }

        const hotelGroup = new HotelGroup(data);
        return await hotelGroup.save();
    } catch (error: any) {
        throw new ApiError(error.statusCode ?? httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
};


export const queryHotelGroups = async (
    filter: Record<string, any>,
    page: number = 1,
    limit: number = 10
): Promise<QueryResult<IHotelGroupDoc>> => {
    return await paginate<IHotelGroupDoc>(HotelGroup, filter, page, limit);
};