const express = require('express')
const md5 = require('md5')
const app = express()
const jwt = require('jsonwebtoken')


// Ambil konfig
const { secretKey } = require('../../config/config');

// call model
const user = require("../../models/index").user

// allow request body
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.post('/', async (req,res) => {
    // put data
    let data = {
        username: req.body.username,
        password: md5(req.body.password),
        role: req.body.role
    }
    
    // put result
    let result = await user.findOne({where:data})

    if(result === null){
        res.json({
            message: "invalid username or password or level",
            isLogged: false
        })
    } else {
        // jwt
        let jwtHeader = {
            algorithm: "HS256",
            // expiresIn: exp.expToken // 1s 1h 1d 1w 1y
        }

        let payload = {
            data: result
        }

        let token = jwt.sign(payload, secretKey, jwtHeader)
        res.json({
            data: result,
            token: token,
            isLogged: true
        })
    }
})

module.exports = app