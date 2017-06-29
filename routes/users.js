'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

/* GET users listing. */
router.get('/', userController.getUsers);

/* GET user by id. */
router.get('/:id', userController.getUser);

module.exports = router;
