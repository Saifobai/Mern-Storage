
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please enter a name']
    },
    email: {
        type: String, required: [true, 'Please enter a email'],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter a valid email address'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minLength: [6, 'password at least 6 character']
    },
    photo: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png"
    },
    phone: {
        type: String,
        default: '+49'
    },
    bio: {
        type: String,
        maxLength: [250, 'Bio must not be more that 250 characters'],
        default: 'bio',

    }

}, { timestamps: true }
)


// Incryption the password before saving to db
userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        return next();
    }

    // hashpassword
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
})

const User = mongoose.model('User', userSchema)
module.exports = User