'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name:{
        type:String
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('register', UserSchema)
