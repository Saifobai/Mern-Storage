const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Not authorized. Please log in.' });
    }

    try {
        // Verify the token and extract the user id
        const verified = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
        const userId = verified.id;

        // Check if the user exists in the database
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }

        // Attach the user to the request object
        req.user = user;

        // Move to the next middleware or route handler
        next();
    } catch (err) {
        // Handle token-related errors
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token has expired.' });
        } else if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Invalid token.' });
        }

        // Handle other errors
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = protect;
