const express = require('express')
const app = express()

const cors = require('cors')

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

app.listen(8080, () => {
    console.log("Server is running")
})