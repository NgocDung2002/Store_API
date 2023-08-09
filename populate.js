require('dotenv').config();
const connectDB = require('./db/connectDB');
const Product = require('./models/productModels');

const dataProducts = require('./data/products.json');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await Product.deleteMany();
    await Product.create(dataProducts);
    console.log('Data successfully ...');
  } catch (error) {
    console.log(error);
  }
};

start();
