'use strict';

const userData = require('../data/users')

const getUserList = async (req, res, next) => {
    try {
        const users = await userData.getUserList()
        res.send(users)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getUser = async (req, res, next) => {
    try {
        console.log('test: ', req)
        const uid = req.params.id
        const oneUser = await userData.getUserById(uid)
        res.send(oneUser)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const addUser = async (req, res, next) => {
    try {
        const data = req.body
        const created = await userData.createUser(data)
        res.send(created)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const uid = req.params.id
        const data = req.body
        const updated = await userData.updateUser(uid, data)
        res.send(updated)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const uid = req.params.id
        const deletedUser = await userData.deleteUser(uid)
        res.send(deletedUser)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    getUserList,
    getUser,
    addUser,
    updateUser,
    deleteUser
}