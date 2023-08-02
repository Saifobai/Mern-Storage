const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const sendEmail = require('../utils/sendEmail')

const genToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// register user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // validations
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill in all required fields");
    }
    if (password.length < 6) {
        res.status(400);
        throw new Error("Password must be at least 6 characters");
    }

    // check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // create new user
    const user = await User.create({
        name,
        email,
        password,
    });

    //generate token
    const token = genToken(user._id);

    //send http only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true,
    });

    if (user) {
        const { _id, name, email, photo, phone, bio } = user;
        res.status(201).json({
            _id,
            name,
            email,
            photo,
            phone,
            bio,
            token,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// login user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    //validations
    if (!email || !password) {
        res.status(400);
        throw new Error("add email and password");
    }

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error("user not found please sign up");
    }

    //check the password correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    //generate token
    const token = genToken(user._id);
    if (passwordIsCorrect) {
        //send http only cookie
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            sameSite: "none",
            secure: true,
        });
    }

    if (user && passwordIsCorrect) {
        const { _id, name, email, photo, phone, bio } = user;
        res.status(200).json({
            _id,
            name,
            email,
            photo,
            phone,
            bio,
            token,
        });
    } else {
        res.status(400);
        throw new Error("invalid email or password");
    }
});

//logout user
const logoutUser = asyncHandler(async (req, res) => {
    //shttp cookie to 0
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: true,
    });

    return res.status(200).json({ message: "user logged out successfully" });
});

//get user profile data
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const { _id, name, email, photo, phone, bio } = user;
        res.status(200).json({
            _id,
            name,
            email,
            photo,
            phone,
            bio,
        });
    } else {
        res.status(400);
        throw new Error("User not found");
    }
});

// get login status
const loginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json(false);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET, {
        algorithms: ["HS256"],
    });
    if (verified) {
        return res.json(true);
    }
    return res.json(false);
});

// update user
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const { name, email, photo, phone, bio } = user;
        user.email = email;
        user.name = req.body.name || name;
        user.phone = req.body.phone || phone;
        user.bio = req.body.bio || bio;
        user.photo = req.body.photo || photo;

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } else {
        res.status(404);
        throw new Error("user not found");
    }
});

//changed password
const changedPassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    //validate user
    if (!user) {
        res.status(400);
        throw new Error("user not found please signup");
    }

    const { oldPassword, newPassword } = req.body;
    //validate
    if (!oldPassword || !newPassword) {
        res.status(400);
        throw new Error("please add old and new password");
    }

    // check if old password is match password in DB
    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

    //save new password
    if (user && passwordIsCorrect) {
        user.password = newPassword;
        await user.save();
        res.status(200).send("password changed successfully");
    } else {
        res.status(400);
        throw new Error("Old password do not match");
    }
});

//const forgotPassword
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error("user does not exist");
    }

    // delete token if it exists in db
    let token = await Token.findOne({ userId: user._id });
    if (token) {
        await token.deleteOne()
    }


    //create reset token
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id;

    console.log(resetToken)

    //hash the reset token before saving to db
    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    // save token to db
    await new Token({
        userId: user._id,
        token: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * (60 * 1000)
    }).save()

    // construct the reset url
    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`

    // reset email
    const message = `
    <h2>Hello ${user.name} </h2>
    <p>Please use the url below to reset your password</p>
    <p>this link is valid for 30 minutes only</p>

    <a href=${resetUrl} clicktracking=off >${resetUrl} </a>
    <p>Regards ...</p>
    `

    const subject = 'password reset request'
    const send_to = user.email
    const sent_from = process.env.EMAIL_USER

    try {
        await sendEmail(subject, message, send_to, sent_from)
        res.status(200).json({ success: true, message: 'Reset email sent successfully' })
    } catch (error) {
        res.status(500)
        throw new Error('email not send please try again')
    }
});


// reset password
const resetPassword = asyncHandler(async (req, res) => {

    const { password } = req.body
    const { resetToken } = req.params

    //hash token then compare with one in db
    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    //find token in db
    const userToken = await Token.findOne({
        token: hashedToken,
        expiresAt: { $gt: Date.now() }
    })

    if (!userToken) {
        res.status(404)
        throw new Error('invalid or expired token')
    }

    //find user
    const user = await User.findOne({ _id: userToken.userId })
    user.password = password
    await user.save()
    res.status(200).json({
        message: 'pasword reset successful, please login'
    })


})







module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    loginStatus,
    updateUser,
    changedPassword,
    forgotPassword,
    resetPassword
};
