//Import/deconstruct schema and model from mongoose
const {Schema, model} = require('mongoose');
//Create new schema
const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}, {timestamps: true});
//Create model
const User = model('user', userSchema);
//Export User
module.exports = User;