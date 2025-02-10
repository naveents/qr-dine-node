import express, { Router } from 'express';
import hotelGroupRoute from './hotel-group.route';
import hotelRoute from './hotel.route';

const router: Router = express.Router();

interface IRoute {
    path: string;
    route: Router;
}

const defaultIRoute: IRoute[] = [
    {
        path: '/hotel-groups',
        route: hotelGroupRoute
    },
    {
        path: '/hotels',
        route: hotelRoute
    }
];

defaultIRoute.forEach( (route) => {
    router.use(route.path, route.route)
});


export default router;
