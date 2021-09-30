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

// import formidable package
const formidable = require('formidable')

//import uuid package
const {
    v1: uuidv1,
} = require('uuid')

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.get('/api/:userId/my-pets-info', async (req, res) => {
    const userId = req.params.userId

    let myPets = await models.Pet.findAll({
        where: {
            user_id: userId
        }
    })
    res.json(myPets)

})

/*
app.get('/api/:userId/:petName/my-pet-image', async (req, res) => {
    const userId = req.params.userId
    const petName = req.params.petName

    let petImage = await models.Pet.findAll({
        where: {
            user_id: userId,
            name: petName
        }
    })
    res.blob(petImage)
})
*/

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

var uniqueFileName = ''

function uploadFile(req, callback) {

    new formidable.IncomingForm().parse(req)
        .on('fileBegin', (name, file) => {

            uniqueFileName = `${uuidv1()}.${file.name.split('.').pop()}`
            file.name = uniqueFileName
            file.path = __dirname + '/uploads/' + file.name
        })
        .on('file', (name, file) => {
            callback(file.name)
        })
}

app.post('/api/upload', (req, res) => {

    uploadFile(req, (photoURL) => {
        res.json({ success: true, message: 'Image was successfully uploaded!' })
    })


})

app.post('/api/add-pet', async (req, res) => {
    const name = req.body.name
    const gender = req.body.gender
    const color = req.body.color
    const breed = req.body.breed
    const is_chipped = req.body.is_chipped
    const chip_id = req.body.chip_id
    const user_id = req.body.user_id



    const pet = models.Pet.build({
        name: name,
        gender: gender,
        color: color,
        breed: breed,
        is_chipped: is_chipped,
        chip_id: chip_id,
        user_id: user_id,
        image: uniqueFileName
    })

    let savedPet = await pet.save()
    if (savedPet != null) {
        res.json({ success: true })
    } else {
        res.json({ message: "Could not save data" })
    }

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
    if(savedLostPet != null) {
        res.json({success: true, message: "Your pet has successfully been reported!"})
    } else {
        res.json({message: 'There was an issue reporting your pet. We apologize for the incovenience. Please try again.'})
    }

})

app.listen(8080, () => {
    console.log("Server is running")
})