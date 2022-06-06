require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require("./middleware/ErrorHandlingMiddleware")
const path = require('path')
const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname,"static","images")))
app.use(express.static(path.resolve(__dirname,"static","books")))
app.use(fileUload({}))
app.use('/api',router)
app.use(errorHandler)
const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT,()=>console.log(`server start ${PORT}`))
    }catch(e){
        console.log(e)
    }
}

start()

