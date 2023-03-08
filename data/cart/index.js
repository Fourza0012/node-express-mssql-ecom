'use strict';

const utils = require('../utils')
const config = require('../../config')
const sql = require('mssql')

const createProductIntoCart = async (uid, pid, amount) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('cart')
        const insertToCart = await pool.request()
                                    .input('uid', sql.Int, uid)
                                    .input('pid', sql.Int, pid)
                                    .input('amount', sql.Int, amount)
                                    .query(sqlQueries.createProductToCart)
        return insertToCart.recordset
    } catch (error) {
        return error.message
    }
}

const updateProductInCart = async (uid, pid, amount) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('cart')
        const updateToCart = await pool.request()
                                    .input('uid', sql.Int, uid)
                                    .input('pid', sql.Int, pid)
                                    .input('amount', sql.Int, amount)
                                    .query(sqlQueries.updateProductInCart)
        return updateToCart.recordset
    } catch (error) {
        return error.message
    }
}

const getCartListByUser = async (uid) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('cart')
        const list = await pool.request()
                                    .input('uid', sql.Int, uid)
                                    .query(sqlQueries.cartListbyUser)
        return list.recordset
    } catch (error) {
        return error.message
    }
}

const getProductCartByUser = async (uid, pid) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('cart')
        const productCart = await pool.request()
                                    .input('uid', sql.Int, uid)
                                    .input('pid', sql.Int, pid)
                                    .query(sqlQueries.productCartByUser)
        return productCart.recordset[0]
    } catch (error) {
        return error.message
    }
}

const deleteProductCart = async (uid, pid) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('cart')
        const deleted = await pool.request()
                                .input('uid', sql.Int, uid)
                                .input('pid', sql.Int, pid)
                                .query(sqlQueries.deleteProductInCart)
        return deleted.recordset
    } catch (error) {
        return error.message
    }
}


module.exports = {
    createProductIntoCart,
    updateProductInCart,
    getProductCartByUser,
    getCartListByUser,
    deleteProductCart
}