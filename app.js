const express = require('express');
require('express-async-errors');
require('dotenv').config();

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connectDB');
const productRoutes = require('./routes/productRoutes');

const app = express();

// middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send(
    '<h1>Welcome Store </h1><a href="/api/v1/products">Products route</a'
  );
});

app.use('/api/v1/products', productRoutes);

// products route

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8888;

const start = async () => {
  try {
    // connet DB
    await connectDB(process.env.MONGO_URL);
    console.log('Data successfully ...');
    app.listen(port, console.log(`Listening on port 127.0.0.1:${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
