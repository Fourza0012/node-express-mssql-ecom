'use strict';

const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()
const auth = require('../middleware/auth')

const {getUserList, getUser, addUser, updateUser, deleteUser, loginUser, checkLoginUser} = userController

router.post('/register', addUser)
router.post('/login', loginUser)
router.get('/users', auth, getUserList)
router.get('/user/:id', auth, getUser)
router.put('/user/:id', auth, updateUser)
router.post('/checklogin', auth, checkLoginUser)
// router.delete('/user/:id', auth, deleteUser)


module.exports = {
    routes: router
}