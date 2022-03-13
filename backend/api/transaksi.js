const express = require('express')
const app = express()

// Panggil Model dari sequelize db:migrate
const transaksi = require("../models/index").transaksi

// Berikan akses 'request-body'
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// Middleware, Autentikasi user
const verify = require("./middleware/auth_verify")
app.use(verify)

// Bagian CRUD [Create, Read, Update, Delete]
// Get data
app.get('/', async(req, res) => {
    transaksi.findAll()
    .then(result => {
        res.json({
            count: result.length,
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
    // Deklarasi semua variable dalam table database transaksi
    let data = {
        id_outlet: req.body.id_outlet,
        id_member: req.body.id_member,
        tgl: req.body.tgl,
        batas_waktu: req.body.batas_waktu,
        tgl_bayar: req.body.tgl_bayar,
        status: req.body.status,
        dibayar: req.body.dibayar,
        id_user: req.body.id_user
    }

    transaksi.create(data)
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

// Delete data
app.delete('/:id', async(req,res) => {
    let parameter = {
        id: req.params.id
    }

    transaksi.destroy({where: parameter})
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