const express = require('express')
const app = express()

//import dotenv
require('dotenv').config()

// import json web token package
const jwt = require('jsonwebtoken')

// import cors package
const cors = require('cors')

//import bcrypt package
const bcrypt = require('bcryptjs')
const salt = 10

const models = require('./models')

app.use(cors())
app.use(express.json())

app.post('/api/register', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email

    const persistedUser = await models.User.findOne({
        where: {
            username: username
        }
    })

    if(persistedUser == null) {
        bcrypt.hash(password, salt, async (error, hash) => {
            if(error) {
                res.json({message: "Error occured when creating user."})
            } else {
                const user = models.User.build({
                    username: username,
                    password: hash,
                    email: email
                })

                let savedUser = await user.save()
                if(savedUser != null) {
                    res.json({success: true})
                }
            }
        })
    } else {
        res.json({message: "User already exists."})
    }
})

app.post('/api/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    let user = await models.User.findOne({
        where: {
            username: username
        }
    })

    if(user != null){
        bcrypt.compare(password, user.password, (error, result) => {
            if(result) {
                const token = jwt.sign({username: user.username}, process.env.ENCODER_KEY)
                res.json({success: true, token: token})
            } else {
                res.json({message: "Password Incorrect"})
            }
        })
    } else {
        res.json({message: "Username Incorrect"})
    }
})

app.listen(8080, () => {
    console.log("Server is running")
})