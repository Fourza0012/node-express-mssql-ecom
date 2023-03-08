'use strict';

const userData = require('../data/users')
const bcrypt = require('bcrypt')
const utils = require('./utils')
const jwt = require('jsonwebtoken')

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
        const uid = req.params.id
        const oneUser = await userData.getUserById(uid)
        res.send(oneUser)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const addUser = async (req, res, next) => {
    try {
        const errorData = utils.createErrorMessage(
            req.body, 
            ['name', 'email', 'password'],
            'is require!'
        )
        if (errorData.status) {
           return res.status(400).send(errorData.message)
        }

        const oldUser = await userData.getUserByEmail(req.body.email)
        if (oldUser) {
            return res.status(409).send('This email has been used!')
        }

        const hashPassword = await bcrypt.hash(req.body.password, 10)
        const newData = { ...req.body, password: hashPassword }
        const created = await userData.createUser(newData)
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

const loginUser = async (req, res, next) => {
    try {
        const errorData = utils.createErrorMessage(
            req.body, 
            ['email', 'password'],
            'is require!'
        )
        if (errorData.status) {
           return res.status(400).send(errorData.message)
        }

        const user = await userData.getUserByEmail(req.body.email)
        if (!user) {
          return res.status(400).send('Invalid User!')
        } 
        else if (!await bcrypt.compare(req.body.password, user.password)) {
          return res.status(400).send('Incorrect Password!')
        } else {
            const token = jwt.sign(
                { user_id: user.uid, email: req.body.email },
                process.env.TOKEN_KEY,
                { expiresIn: '1h' }
            )
            user.token = token
          return res.send(user)
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
} 

module.exports = {
    getUserList,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    loginUser
}