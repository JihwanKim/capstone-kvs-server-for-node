const express = require('express')
const bodyParser = require('body-parser')
const test = require('./routers/test')
const health = require('./routers/health')
const pictureAnalysis = require('./routers/picture_analysis')
const setting = require('./routers/setting')
const sms = require('./routers/sms')
const app = express();
const http = require('http')
//const getConnection = require('./db/mysql')

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type")
    next();
})
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/test', test)
app.use('/health', health)
app.use('/picture', pictureAnalysis)
app.use('/setting', setting)
app.use('/sms', sms)



const { PORT } = require('./constants')

http.createServer(app).listen(PORT, () => {
    console.info(`Backend Server is running on ${PORT}..`)
})