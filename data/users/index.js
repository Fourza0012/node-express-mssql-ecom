'use strict';

const utils = require('../utils')
const config = require('../../config')
const sql = require('mssql')

const getUserList = async () => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('users')
        const list = await pool.request().query(sqlQueries.userslist)
        return list.recordset
    } catch (error) {
        return error.message
    }
}

const getUserById = async (uid) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('users')
        const oneUser = await pool.request()
                                .input('uid', sql.Int, uid)    
                                .query(sqlQueries.userbyId)
        return oneUser.recordset[0]
    } catch (error) {
        return error.message
    }
}

const getUserByEmail = async (email) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('users')
        const oneUser = await pool.request()
                                .input('email', sql.NVarChar(sql.MAX), email)    
                                .query(sqlQueries.userbyEmail)
        return oneUser.recordset[0]
    } catch (error) {
        return error.message
    }
}

const createUser = async (userData) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('users')
        const insertUser = await pool.request()
                                    .input('name', sql.NVarChar(50), userData.name)
                                    .input('email', sql.NVarChar(sql.MAX), userData.email)
                                    .input('password', sql.NVarChar(sql.MAX), userData.password)
                                    .query(sqlQueries.createUser)
        return insertUser.recordset
    } catch (error) {
        return error.message
    }
}

const updateUser = async (uid, userData) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('users')
        const update = await pool.request()
                                .input('uid', sql.Int, uid)
                                .input('name', sql.NVarChar(50), userData.name)
                                .input('email', sql.NVarChar(sql.MAX), userData.email)
                                .query(sqlQueries.updateUser)
        return update.recordset
    } catch (error) {
        return error.message
    }
}

const deleteUser = async (uid) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('users')
        const deleted = await pool.request()
                                .input('uid', sql.Int, uid)
                                .query(sqlQueries.deleteUser)
        return deleted.recordset
    } catch (error) {
        return error.message
    }
}

module.exports = {
    getUserList,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
}