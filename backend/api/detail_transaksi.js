const express = require('express')
const app = express()

// Panggil Model dari sequelize db:migrate
const detail_transaksi = require("../models/index").detail_transaksi

// Berikan akses 'request-body'
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// Middleware, Autentikasi user
const verify = require("./middleware/auth_verify")
app.use(verify)

// Bagian CRUD [Create, Read, Update, Delete]
// Get data
app.get('/', async(req, res) => {
    detail_transaksi.findAll()
    .then(result => {
        res.json({
            data_transaksi: result,
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
    // Deklarasi semua variable dalam table database detail_transaksi
    let data = {
        id_transaksi: req.body.id_transaksi,
        id_paket: req.body.id_paket,
        qty: req.body.qty,
    }

    detail_transaksi.create(data)
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
        id_transaksi: req.body.id_transaksi,
        id_paket: req.body.id_paket,
        qty: req.body.qty
    }

    let id = {
        id: req.body.id
    }

    detail_transaksi.update(data, {where: id})
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

    detail_transaksi.destroy({where: parameter})
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