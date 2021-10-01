// import json web token package
const jwt = require('jsonwebtoken')

function authenticate (req, res, next){

    const authHeaders = req.headers['authorization']
    if (authHeaders) {
        let token = authHeaders.split(' ')[1]
        // verify token
        try {
            const decoded = jwt.verify(token, process.env.ENCODER_KEY)
            if (decoded) {
                const username = decoded.username
                const persistedUser = models.User.findOne({
                    where: {
                        username: username
                    }
                })
                if (persistedUser) {
                    next()
                } else {
                    //user does not exist
                    res.json({ success: false, message: 'User does not exist!' })
                }
            } else {
                // decoding fails
                res.status(401).json({ success: false, message: 'No authorization headers found!' })
            }
        } catch (error) {
            res.status(401).json({ success: false, message: 'Token has been altered!' })
        }
    } else {
        // no authorization headers
        res.status(401).json({ success: false, message: 'No authorization headers found!' })
    }


}

module.exports = authenticate