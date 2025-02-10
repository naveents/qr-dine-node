import { Request, Response } from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from "./app";
import logger from './modules/logger/logger';
dotenv.config();


const port = process.env.PORT || 3000;
const mongoURL = process.env.MONGODB_URL || "";

let server: any;

mongoose.connect(mongoURL, {
    serverSelectionTimeoutMS: 5000,
}).then(
    () => {
        //improve this using logger
        logger.info('Connected to mongodb');
        server = app.listen(port, () => {
            logger.info(`Server listening on port ${port} `);
        });
    }).catch((error) => {
        logger.debug(`Error: ${error}`);
    });

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error: string) => {
    logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});


