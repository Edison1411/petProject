const router = require('express').Router();
const UserController = require('../controllers/UserController');

// User Routes
router.post('/user/createWithList', UserController.createWithList);
router.get('/user/:username', UserController.getUserByUsername);
router.put('/user/:username', UserController.updateUser);
router.delete('/user/:username', UserController.deleteUser);
router.get('/user/login', UserController.login);
router.get('/user/logout', UserController.logout);
router.post('/user/createWithArray', UserController.createWithArray);
router.post('/user', UserController.createUser);

module.exports = router;
