'use strict';

const productData = require('../data/product')

const getProductList = async (req, res, next) => {
    try {
        const users = await productData.getProductList()
        res.send(users)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getProduct = async (req, res, next) => {
    try {
        const pid = req.params.id
        const oneUser = await productData.getProductById(pid)
        res.send(oneUser)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const pid = req.params.id
        const data = req.body
        const updated = await productData.updateProduct(pid, data)
        res.send(updated)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    getProductList,
    getProduct,
    updateProduct,
}