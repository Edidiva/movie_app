const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")
const {authMiddleware} = require("../Middlewares/authMiddleware");
const {verifyResetToken} = require("../Middlewares/verifyResetTokenMiddlware");

router.post('/signup', userController.signup);
router.post('/login', userController.Login);
// router.get('/protected', authMiddleware, userController.protectedRoute);
router.post('/forget_password', userController.forgetPassword);
router.post('/reset_password', verifyResetToken, userController.resetPassword);
router.get('/users', userController.getAllUsers);






module.exports = router;

