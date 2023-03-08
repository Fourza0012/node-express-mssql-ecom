'use strict';

const express = require('express')
const cartController = require('../controllers/cartController')
const router = express.Router()
const auth = require('../middleware/auth')

const {getCartListByUser, addProductToCart, deleteProductInCart} = cartController

router.post('/addcart/:id', auth, addProductToCart)
router.get('/carts/:id', auth, getCartListByUser)
router.delete('/cart/:id', auth, deleteProductInCart)

module.exports = {
    routes: router
}