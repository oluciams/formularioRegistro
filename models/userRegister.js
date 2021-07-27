'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name:{
        type:String,
        required: true,
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

UserSchema.pre('save', function (next){
    bcrypt.hash(this.password, 10, (err, hash)=>{
        if (err){
            return next(err)
        }    
        this.password = hash
        next()
    })
})

module.exports = mongoose.model('register', UserSchema)
