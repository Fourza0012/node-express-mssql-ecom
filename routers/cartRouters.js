'use strict';

const express = require('express')
const cartController = require('../controllers/cartController')
const router = express.Router()
const auth = require('../middleware/auth')

const {getCartListByUser, addProductToCart, deleteProductInCart} = cartController

router.post('/addcart/:id', addProductToCart)
router.get('/carts/:id', getCartListByUser)
router.delete('/cart/:id', deleteProductInCart)

module.exports = {
    routes: router
}