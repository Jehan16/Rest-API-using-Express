const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    })
})

router.get('/:productID', (req, res, next) => {
    const id = req.params.productID
    
    if(id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        })
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        })
    }
})

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    }

    res.status(201).json({
        message: 'Handling POST requests to /products',
        createdProduct: product
    })
})

router.patch('/:productID', (req, res, next) => {
    res.status(200).json({
        message: 'UPDATED product'
    })
})

router.delete('/:productID', (req, res, next) => {
    res.status(200).json({
        message: 'DELETED product'
    })
})

module.exports = router