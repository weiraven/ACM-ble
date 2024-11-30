const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: [true, 'First name is required.']},
    lastName: { type: String, required: [true, 'Last name is required.']},
    email: { type: String, required: [true, 'Email address is required.'], unique: [true, 'Email already exists.']},
    password: { type: String, required: [true, 'Password is required.']}
});

userSchema.pre('save', function (next) {
    let user = this;

    if (!user.password) {
        console.error('Password is missing!');
        return next(new Error('Password is required.'));
    }

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt
        .hash(user.password, 10) // Add a second argument for hashing rounds
        .then(hash => {
            user.password = hash;
            next();
        })
        .catch(err => next(err));
});

userSchema.methods.comparePassword = function(inputPassword) {
    let user = this;
    return bcrypt.compare(inputPassword, user.password);
}

module.exports = mongoose.model('User', userSchema);