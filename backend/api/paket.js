const express = require('express')
const app = express()

// Panggil Model dari sequelize db:migrate
const paket = require("../models/index").paket

// Berikan akses 'request-body'
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// Middleware, Autentikasi user
const verify = require("./middleware/auth_verify")
app.use(verify)

// Bagian CRUD [Create, Read, Update, Delete]
// Get data
app.get('/', async(req, res) => {
    paket.findAll()
    .then(result => {
        res.json({
            count: result.length,
            data_paket: result,
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
    // Deklarasi semua variable dalam table database paket
    let data = {
        id_outlet: req.body.id_outlet,
        jenis: req.body.jenis,
        harga: req.body.harga
    }

    paket.create(data)
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
        id_outlet: req.body.id_outlet,
        jenis: req.body.jenis,
        nama_paket: req.body.nama_paket,
        harga: req.body.harga
    }

    let id = {
        id: req.body.id
    }

    paket.update(data, {where: id})
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

    paket.destroy({where: parameter})
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