'use strict';

const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()
const auth = require('../middleware/auth')

const {getUserList, getUser, addUser, updateUser, deleteUser, loginUser} = userController

router.post('/register', addUser)
router.post('/login', loginUser)
router.get('/users', auth, getUserList)
router.get('/user/:id', getUser)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)


module.exports = {
    routes: router
}