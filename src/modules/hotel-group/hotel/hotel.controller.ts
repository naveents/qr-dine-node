import { HotelService } from ".";
import { catchAsync } from "../../utils";
import { Request, Response } from 'express';
import httpStatus from 'http-status';


export const createHotel = catchAsync(
    async(req: Request, res: Response) => {
        const hotel = await HotelService.createHotel(req.body);
        res.status(httpStatus.CREATED).json({
            success: true,
            message: "Hotel group created successfully",
            data: hotel,
        });
    }
)

export const getHotels = catchAsync(async (req: Request, res: Response) => {
    const { page = 1, limit = 50, ...filter } = req.query;
    const hotels = await HotelService.queryHotels(
        filter,
        Number(page),
        Number(limit)
    );
    res.status(httpStatus.OK).json(hotels);
});