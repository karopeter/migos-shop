const AppError = require('../utils/appError');

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
    const value = err.msg.match(/(["'])(\\?.)*?\1/)[0];
    console.log(value);

     const message = `Duplicate fields value: ${value}. Please use the right access!`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
    const errors = Object.value(err.errors).map(el => el.message);
    const message = `Invalid input data. ${error.join(' .')}`;
    return new AppError(message, 400);
};


const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
       status: err.status,
       error: err,
       message: err.message,
       stack: err.stack
    });
};

const sendErrorProd = (err, res) => {
    if (err.isOperational) {
       res.status(err.statusCode).json({
          status: err.status,
          message: err.message
       });
    } else {
      console.log('ERROR', err)

      res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!'
      });
    }
};

module.exports = (err, req, res, next) => {
      console.log(err.stack);

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    } if (process.env.NODE_ENV === 'production') {
        let error = { ...res }
        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'validationError') error = handleValidationErrorDB(error);
         sendErrorProd(error, res)
    }
}