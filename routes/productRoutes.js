const express = require('express');
const productsController = require('../controller/productsController');

const router = express.Router();

router.get('/', productsController.getAllProducts);

module.exports = router;
