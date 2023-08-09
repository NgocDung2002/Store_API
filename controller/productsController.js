const Product = require('../models/productModels');

exports.getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  if (featured) queryObject.featured = featured === 'true' ? true : false;
  if (company) queryObject.company = company;
  if (name) queryObject.name = { $regex: name, $options: 'i' };

  let result = Product.find(queryObject);

  //sort
  if (sort) {
    const sortList = sort.replace(',', ' ');
    result = result.sort(sortList);
  } else result = result.sort('createAt');

  //fields
  if (fields) {
    const fieldsList = fields.replace(',', ' ');
    result = result.select(fieldsList);
  } else result = result.select('name price');

  //page
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result.skip(skip).limit(limit);

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|<=|=|>|>=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  console.log(queryObject);

  const products = await result;
  res.status(200).json({
    status: 'success',
    length: products.length,
    data: products,
  });
};
