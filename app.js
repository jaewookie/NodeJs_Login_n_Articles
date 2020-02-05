var express = require('express')
var app = express()
require('ejs')
require('dotenv').config()
var path = require('path')
var bodyParser = require('body-parser')

var dataRouter = require('./routes/router.js')

// ecmascript6
// import express from 'express'

//setting
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')


//middle ware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))

app.use('/', dataRouter)

//sever generate
var port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`Sever : http://localhost:${port}`)
})