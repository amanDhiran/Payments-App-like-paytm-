const express = require('express')
const mongoose = require('mongoose')


const rootRouter = require('./routes/index')

const cors = require('cors')

const app = express()

require('dotenv').config()

//connect db
try {
    mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`)
    console.log("db connected");
} catch (error) {
    console.log("db error");
}

//to support JSON body in requests
app.use(express.json())

//cors configuration
app.use(cors())

// route all requests from /api/v1 to rootRouter
app.use("/api/v1", rootRouter)

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})