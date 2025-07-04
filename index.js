const express = require('express')
const cors = require('cors')
//import bd
const conn = require('./db/conn')

//routes imports
const UserRoutes = require('./routes/UserRoutes')
const app = express()


//midlewares (config json response)
app.use(express.json())


//solve cors
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

//public for images
app.use(express.static('public'))

//routes
app.use('/users', UserRoutes)
//conn
conn.sync().then(() => {
    app.listen(5000, () => {
        console.log('Servidor rodando em http://localhost:5000')
    })
}).catch((error) => console.log(error))
