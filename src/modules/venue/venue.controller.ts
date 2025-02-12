import { Request, Response } from "express";
import { catchAsync } from "../utils";
import { VenueService } from ".";
import httpStatus from 'http-status';

export const createVeneue = catchAsync(async(req: Request, res: Response) => {
    const venue = VenueService.createVenue(req.body);
    res.status(httpStatus.CREATED).json({
        success: true,
        message: "Venue created successfully",
        data: venue,
    });
    
});