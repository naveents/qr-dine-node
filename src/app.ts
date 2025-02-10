import express, { Express } from 'express';

import routes from './routes';
import { ApiError, errorConverter, errorHandler } from './modules/errors';
import httpStatus from 'http-status';

const app: Express = express();

// Tells the Express application to use the built-in middleware for parsing incoming requests with
// a Content-Type header of application/json.
app.use(express.json());

// v1 api routes
app.use('/api/v1', routes);


// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// handle error
app.use(errorHandler);

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));


export default app;