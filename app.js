const express = require('express');
const morgan = require('morgan');
const migosRouter = require('./routes/migosRoutes');
const userRouter = require('./routes/userRoutes');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const app = express();

// MIDDLEWARE 
if (process.env.NODE_ENV === 'production') {
   app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/templates`));

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


app.use('/api/v1/migos', migosRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


app.use(globalErrorHandler);


module.exports = app;
