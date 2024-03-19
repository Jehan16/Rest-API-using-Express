const express = require('express')
const app = express()

productRoutes = require('./api/routes/products')

app.use('/products', productRoutes)

module.exports = app;