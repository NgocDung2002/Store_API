const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  return res.status(500).send('Something went wrong, please try again');
};

module.exports = errorHandlerMiddleware;
