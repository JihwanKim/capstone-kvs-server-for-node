const express = require('express')
const bodyParser = require('body-parser')
const test = require('./routers/test')
const pictureAnalysis = require('./routers/picture_analysis')
const app = express();
const getConnection = require('./db/mysql')

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type")
    next();
})
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/test', test)
app.use('/picture', pictureAnalysis)

module.exports = app
