const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const bcrypt = require("bcrypt")
const saltRounds = 10

const User = require("../models/user")

router.post("/signup", (req, res, next) =>{
    User.find({email: req.body.email})
    .exec()
    .then(user =>{
        if(user.length >=1){
            return res.status(409).json({
                message: "email exists"
            })
        }else{
            bcrypt.hash(req.body.password, saltRounds, (err, hash) =>{
            if(err){
                return res.status(500).json({
                    error: err
                })
            }else{
                const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email:req.body.email ,
        password: hash
    })
    user.save()
    .then(result =>{
        res.status(201).json({
            message: "User created"
        })
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
        }
    })
        }
    })

    
})

router.delete("/:userId", (req, res, next) =>{
    User.remove({_id: req.params.userId})
    .exec()
    .then(result =>{
        res.status(200).json({
            message: "User deleted"
        })
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router