const express = require('express')
const app = express()

// Panggil Model dari sequelize db:migrate
const outlet = require("../models/index").outlet

// Berikan akses 'request-body'
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// Middleware, Autentikasi user
const verify = require("./middleware/auth_verify")
app.use(verify)

// Bagian CRUD [Create, Read, Update, Delete]
// Get data
app.get('/', async(req, res) => {
    outlet.findAll()
    .then(result => {
        res.json({
            count: result.length,
            data_outlet: result,
            found: true
        })
    })
    .catch(error => {
        res.json({
            message: error.message,
            found: false
        })
    })
})

// Add data
app.post('/', async(req,res) => {
    // Deklarasi semua variable dalam table database outlet
    let data = {
        nama: req.body.nama,
        alamat: req.body.alamat,
        tlp: req.body.tlp
    }

    outlet.create(data)
    .then(result => {
        res.json({
            message: "Data inserted",
            isSuccess: true,
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message,
            isSuccess: false
        })
    })
})

// Update data
app.put('/', async(req,res) => {
    let data = {
        nama: req.body.nama,
        alamat: req.body.alamat,
        tlp: req.body.tlp
    }

    let id = {
        id: req.body.id
    }

    outlet.update(data, {where: id})
    .then(result => {
        res.json({
            message: "Data updated",
            isSuccess: true
        })
    })
    .catch(error => {
        res.json({
            message: error.message,
            isSuccess: false
        })
    })
})

// Delete data
app.delete('/:id', async(req,res) => {
    let parameter = {
        id: req.params.id
    }

    outlet.destroy({where: parameter})
    .then(result => {
        res.json({
            message: "Data deleted",
            isSuccess: true
        })
    })
    .catch(error => {
        res.json({
            message: error.message,
            isSuccess: false
        })
    })
})

module.exports = app