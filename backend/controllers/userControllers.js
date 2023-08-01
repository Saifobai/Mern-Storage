
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const genToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}


// register user
const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body

    // validations
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please fill in all required fields')
    }
    if (password.length < 6) {
        res.status(400)
        throw new Error('Password must be at least 6 characters')
    }

    // check if user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // create new user
    const user = await User.create({
        name, email, password
    })

    //generate token
    const token = genToken(user._id)

    //send http only cookie
    res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: 'none',
        secure: true
    })

    if (user) {
        const { _id, name, email, photo, phone, bio } = user
        res.status(201).json({
            _id,
            name,
            email,
            photo,
            phone,
            bio,
            token
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


// login user
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    //validations
    if (!email || !password) {
        res.status(400)
        throw new Error('add email and password')
    }

    //check if user exists
    const user = await User.findOne({ email })
    if (!user) {
        res.status(400)
        throw new Error('user not found please sign up')
    }

    //check the password correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password)


    if (passwordIsCorrect) {

        //generate token
        const token = genToken(user._id)

        //send http only cookie
        res.cookie('token', token, {
            path: '/',
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            sameSite: 'none',
            secure: true
        })
    }



    if (user && passwordIsCorrect) {
        const { _id, name, email, photo, phone, bio } = user
        res.status(200).json({
            _id,
            name,
            email,
            photo,
            phone,
            bio,
            token

        })
    } else {
        res.status(400)
        throw new Error('invalid email or password')
    }

})



module.exports = {
    registerUser,
    loginUser
}