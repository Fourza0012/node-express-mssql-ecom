'use strict';

const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()

const {getUserList, getUser, addUser, updateUser, deleteUser} = userController

router.get('/users', getUserList)
router.get('/user/:id', getUser)
router.post('/user', addUser)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)


module.exports = {
    routes: router
}