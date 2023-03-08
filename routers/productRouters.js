'use strict';

const express = require('express')
const productController = require('../controllers/productController')
const router = express.Router()
const auth = require('../middleware/auth')

const {getProduct, getProductList, updateProduct} = productController

router.get('/product', getProductList)
router.get('/product/:id', getProduct)
router.post('/product/checkout', auth, updateProduct)

module.exports = {
    routes: router
}