require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./config/db')
const route = require('./router/route')
const appMiddleware = require('./middleware/appMiddleware')

const bookstoreServer = express()

bookstoreServer.use(cors())
bookstoreServer.use(express.json())
bookstoreServer.use(appMiddleware)
bookstoreServer.use(route)
bookstoreServer.use('/uploads', express.static('uploads'))

// ✅ Root route MUST send response
bookstoreServer.get('/', (req, res) => {
    res.status(200).send("Welcome to Bookstore Server 🚀")
})

// ✅ Correct PORT handling for Render
const PORT = process.env.PORT || 3000

bookstoreServer.listen(PORT, () => {
    console.log(`Book store server running on port ${PORT}`)
})
