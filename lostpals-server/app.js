const express = require('express')
const app = express()

const PORT = process.env.PORT || 8080

//import dotenv
require('dotenv').config()

// import json web token package
const jwt = require('jsonwebtoken')

// import cors package
const cors = require('cors')

//import bcrypt package
const bcrypt = require('bcryptjs')
const salt = 10

// import models
global.models = require('./models')

// import multer package
const multer = require('multer')
const upload = multer({ dest: 'uploads/'})

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

// import authenticate middleware
const authenticate = require('./middlewares/authorizationMiddleware')

// import S3 upload function
const { uploadFile } = require('./middlewares/S3')

app.use(cors())
app.use(express.json())


app.get('/api/:userId/my-pets-info', authenticate, async (req, res) => {

    const userId = req.params.userId

    let myPets = await models.Pet.findAll({
        where: {
            user_id: userId
        }
    })
    res.json(myPets)

})


app.post('/api/register', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email

    const persistedUser = await models.User.findOne({
        where: {
            username: username
        }

    })

    if (persistedUser == null) {
        bcrypt.hash(password, salt, async (error, hash) => {
            if (error) {
                res.json({ message: "Error occured when creating user." })
            } else {
                const user = models.User.build({
                    username: username,
                    password: hash,
                    email: email
                })

                let savedUser = await user.save()
                if (savedUser != null) {
                    res.json({ success: true })
                }
            }
        })
    } else {
        res.json({ message: "User already exists." })
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

    if (user != null) {
        bcrypt.compare(password, user.password, (error, result) => {
            if (result) {
                // generate web token
                const token = jwt.sign({ username: user.username }, process.env.ENCODER_KEY)
                res.json({ success: true, token: token, userId: user.id })
            } else {
                res.json({ message: "Password Incorrect" })
            }
        })
    } else {
        res.json({ message: "Username Incorrect" })
    }
})


app.post('/api/add-pet', upload.single('image'), async (req, res) => {

    const file = req.file

    const result = await uploadFile(file)

    const name = req.body.name
    const gender = req.body.gender
    const color = req.body.color
    const breed = req.body.breed
    const is_chipped = req.body.is_chipped
    const chip_id = req.body.chip_id
    const user_id = req.body.user_id
    const imageURl = result.Location


    const pet = await models.Pet.build({

        name: name,
        gender: gender,
        color: color,
        breed: breed,
        is_chipped: is_chipped,
        chip_id: chip_id,
        user_id: user_id,
        image: imageURl
    })

    let savedPet = await pet.save()
    if (savedPet != null) {
        res.send({ success: true })
    } else {
        res.send({ message: "Could not save data" })
    }

    unlinkFile(file.path)

})

app.post('/api/report-lost-pet', async (req, res) => {
    const petId = req.body.petId
    const circumstance = req.body.circumstance
    const dateLost = req.body.dateLost
    const zipcode = parseInt(req.body.zipcode)

    const lostPet = models.LostPet.build({
        pet_id: petId,
        date_lost: dateLost,
        circumstance: circumstance,
        zipcode: zipcode
    })

    let savedLostPet = await lostPet.save()
    if (savedLostPet != null) {
        res.json({ success: true, message: "Your pet has successfully been reported!" })
    } else {
        res.json({ message: 'There was an issue reporting your pet. We apologize for the incovenience. Please try again.' })
    }

})

app.get('/api/lost-pets', async (req, res) => {

    let lostPets = await models.LostPet.findAll({
        include: [{
            model: models.Pet,
            as: 'pet',

        }]
    })


    res.json(lostPets)
})

app.post('/api/add-comment', async (req, res) => {
    const userId = req.body.userId
    const lostPetId = req.body.lostPetId
    const message = req.body.message

    const comment = models.Comment.build({
        user_id: userId,
        lostPet_id: lostPetId,
        message: message
    })

    let savedComment = await comment.save()

    if(savedComment != null) {
        res.json({success: true})
    } else [
        res.json({message: 'There was an issue saving your comment!'})
    ]
})

app.get('/api/:lostPetId/get-comments', async (req, res) => {

    const lostPetId = req.params.lostPetId

    let comments = await models.Comment.findAll({
        where: {
            lostPet_id: lostPetId
        },
        include:[{
            model: models.User,
            as: 'user'
        }]
    })

    res.json(comments)
})

app.listen(PORT, () => {
    console.log("Server is running")
})