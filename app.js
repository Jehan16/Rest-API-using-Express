const express = require('express')
const app = express()

productRoutes = require('./api/routes/products')
orderRoutes = require('./api/routes/orders')

app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

module.exports = app;