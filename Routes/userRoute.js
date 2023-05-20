const express = require("express");
const router = express.Router;
const userController = require("../controllers/userControllers")
const {authMiddlewares} = require("../Middlewares/authMiddleware");
const verifyResetToken = require("../Middlewares/verifyResetTokenMiddlware");

router.post('/signup', userController.createUser);
router.post('/login', userController.login);
router.get('/protected', authMiddlewares, userController.protectedRoute);
router.post('/forget_password', userController.forgetPassword);
router.resetPssword('/reset_password', verifyResetToken, userController.resetPssword);






module.exports = router;

