import CustomError from '../errors/customError.js';

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send(err.message);
  }
  res.status(500).send('internal server error');
};

export default errorHandler;
