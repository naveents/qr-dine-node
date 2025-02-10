import httpStatus from 'http-status';
import { Request, Response } from 'express';

import * as HotelGroupService from './hotel-group.service';
import { catchAsync } from '../utils';


export const createHotelGroup = catchAsync(async (req: Request, res: Response) => {
    const hotelGroup = await HotelGroupService.createHotelGroup(req.body);
    res.status(httpStatus.CREATED).json({
        success: true,
        message: "Hotel group created successfully",
        data: hotelGroup,
    });

});

export const getHotelGroups = catchAsync(async (req: Request, res: Response) => {
    const { page = 1, limit = 50, ...filter } = req.query;
    const hotelGroups = await HotelGroupService.queryHotelGroups(
        filter,
        Number(page),
        Number(limit)
    );
    res.status(httpStatus.OK).json(hotelGroups);
});