const express = require('express')
var cors = require('cors')
const app = express()

// Ambil konfig
const { port } = require('./config/config');

// CORS is a mechanism that allows restricted resources on a web page 
// to be requested from another domain outside the domain from which 
// the first resource was served
app.use(cors())
app.use(express.static(__dirname))

// Middleware
const auth = require("./api/middleware/auth")

// Deklarasi API
const user = require("./api/user")
const member = require("./api/member")
const outlet = require("./api/outlet")
const paket = require("./api/paket")
const detail_transaksi = require("./api/detail_transaksi")
const transaksi = require("./api/transaksi")

// Gunakan API
app.use("/user", user)
app.use("/member", member)
app.use("/outlet", outlet)
app.use("/paket", paket)
app.use("/detail_transaksi", detail_transaksi)
app.use("/transaksi", transaksi)
app.use("/auth", auth)

// Server
app.listen(port, () => {
    console.log("server run in port: " + port)
})