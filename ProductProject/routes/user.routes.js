const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');


router.get('/user', userController.getUsers);
router.get('/user/:username', userController.getUser);
router.get('/login', userController.login);
router.post('/user', userController.addUser);
router.put('/user', userController.updateUser);
router.delete('/user', userController.deleteUser);
router.get('/isadmin', userController.isAdmin);


module.exports = router;