class ApiError extends Error {
    statusCode: number;

    isOperational: boolean;

    //override stack?: string;

    constructor(statusCode: number, message: string, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational; 
    }
}

export default ApiError;