const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


const User = model('User', userSchema);

module.exports = User;