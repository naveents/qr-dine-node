import express, { Router } from "express";
import { HotelGroupController, HotelGroupValidator } from "../modules/hotel-group";
import { validate } from "../modules/validate";

const router: Router = express.Router();

router
    .route("/")
    .post(validate(HotelGroupValidator.createHotelGroupValidator), HotelGroupController.createHotelGroup)
    .get(HotelGroupController.getHotelGroups);

export default router;
