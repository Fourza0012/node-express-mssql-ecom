'use strict';

const cartData = require('../data/cart')
const utils = require('./utils')

const getCartListByUser = async (req, res, next) => {
    try {
        const uid = req.params.id
        const errorData = utils.createErrorMessage(
            { uid }, 
            ['uid'],
            'is require!'
        )
        if (errorData.status) {
           return res.status(400).send(errorData.message)
        }
        const carts = await cartData.getCartListByUser(uid)
        res.send(carts)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const addProductToCart = async (req, res, next) => {
    try {
        const uid = req.params.id
        const errorData = utils.createErrorMessage(
            { uid, ...req.body}, 
            ['uid', 'pid', 'amount'],
            'is require!'
        )
        if (errorData.status) {
           return res.status(400).send(errorData.message)
        }
        if (req.user.uid !== parseInt(uid)) {
            return res.status(400).send('No Permission for add cart!')
        }  

        const oldProductCart = await cartData.getProductCartByUser(uid, req.body.pid)
        if (oldProductCart) {
            const updateItem = await cartData.updateProductInCart(uid, req.body.pid, req.body.amount)
            res.send(updateItem)
        } else {
            const createItem = await cartData.createProductIntoCart(uid, req.body.pid, req.body.amount)
            res.send(createItem)
        }
        
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const deleteProductInCart = async (req, res, next) => {
    try {
        const uid = req.params.id
        const errorData = utils.createErrorMessage(
            { uid, ...req.body }, 
            ['uid', 'pid'],
            'is require!'
        )
        
        if (errorData.status) {
            return res.status(400).send(errorData.message)
         }
         if (req.user.uid !== parseInt(uid)) {
            return res.status(400).send('No Permission for delete cart!')
        }  

         const oldProductCart = await cartData.getProductCartByUser(uid, req.body.pid)
         if (oldProductCart) {
            const deletedItem = await cartData.deleteProductCart(uid, req.body.pid)
            res.send(deletedItem)
         } else {
            res.status(400).send('Not Found Product in cart!')
         }
    } catch (error) {
        res.status(400).send(error.message)
    }
}
 

module.exports = {
    getCartListByUser,
    addProductToCart,
    deleteProductInCart
}