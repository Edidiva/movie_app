const express = require("express");
const router = express.Router;
const userController = require("../controllers/userControllers")

router.post('/signup', userController.createUser);
router.post('/login', userController.login);
router.post('/forget_password', userController.forgetPassword);




module.exports = router;

