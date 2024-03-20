const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const mongoose = require('mongoose')

// GET all the products
router.get('/', (req, res, next) => {
    Product.find()
        .exec()
        .then(docs => {
            console.log(docs)
            res.status(200).json(docs)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

// GET product from an id
router.get('/:productID', (req, res, next) => {
    const id = req.params.productID

    Product.findById(id).exec().then(doc => {
        console.log('From database', doc)
        if (doc) {
            res.status(200).json(doc)
        } else {
            res.status(404).json({
                message: 'No valid entry found for the provided ID'
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

// post request to products
router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })

    product
        .save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: 'Handling POST requests to /products',
                createdProduct: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

// PATCH using the ID
router.patch('/:productID', (req, res, next) => {
    const id = req.params.productID
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Product.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

// DELETE using the ID
router.delete('/:productID', (req, res, next) => {
    const id = req.params.productID
    Product.findOneAndDelete({ _id: id })
        .exec()
        .then(result => {
            console.log('Product deleted ')
            res.status(200).json({
                message: 'Successfully deleted',
                product: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router