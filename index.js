const express = require('express')
const cors = require('cors')

//routes imports

const app = express()


//midlewares (config json response)
app.use(express.json())


//solve cors
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

//public for images
app.use(express.static('public'))

//routes

app.listen(5000)