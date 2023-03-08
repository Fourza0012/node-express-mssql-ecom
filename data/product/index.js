'use strict';

const utils = require('../utils')
const config = require('../../config')
const sql = require('mssql')

const getProductList = async () => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('product')
        const list = await pool.request().query(sqlQueries.productslist)
        return list.recordset
    } catch (error) {
        return error.message
    }
}

const getProductById = async (pid) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('product')
        const oneUser = await pool.request()
                                .input('pid', sql.Int, pid)    
                                .query(sqlQueries.productbyId)
        return oneUser.recordset[0]
    } catch (error) {
        return error.message
    }
}

const updateProduct = async (pid, productData) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('product')
        const update = await pool.request()
                                .input('pid', sql.Int, pid)
                                .input('pname', sql.NVarChar(50), productData.pname)
                                .input('description', sql.NVarChar(sql.MAX), productData.description)
                                .input('price', sql.Money, productData.price)
                                .input('amount', sql.Int, productData.amount)
                                .query(sqlQueries.updateProduct)
        return update.recordset
    } catch (error) {
        return error.message
    }
}

module.exports = {
    getProductList,
    getProductById,
    updateProduct
}