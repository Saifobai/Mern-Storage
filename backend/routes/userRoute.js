

const express = require('express')
const { registerUser, loginUser, logoutUser, getUser, loginStatus, updateUser, changedPassword, forgotPassword, resetPassword } = require('../controllers/userControllers')
const protect = require('../middleware/authMidleWare')
const router = express.Router()

// register user
router.post('/register', registerUser)

//login user
router.post('/login', loginUser)

//logout user
router.get('/logout', logoutUser)

//get user route
router.get('/getuser', protect, getUser)

//login status
router.get('/loggedin', loginStatus)

//update user 
router.patch('/updateuser', protect, updateUser)

//change password
router.patch('/changepassword', protect, changedPassword)

//forgot password
router.post('/forgotpassword', forgotPassword)

//reset password
router.put('/resetpassword/:resetToken', resetPassword)






module.exports = router