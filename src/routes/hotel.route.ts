import express, {Router} from 'express';
import { HotelController, HotelValidator } from '../modules/hotel-group/hotel';
import { validate } from '../modules/validate';

const router: Router = express.Router();

router
    .route("/")
    .post(validate(HotelValidator.createHotelValidator), HotelController.createHotel)
    .get(HotelController.getHotels)

export default router;