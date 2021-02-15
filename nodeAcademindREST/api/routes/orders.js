const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Handling GET requests to /orders'
    })
})

router.post('/', (req, res) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: 'Handling POST requests to /orders',
        order
    })
})

router.get('/:orderId', (req, res) => {
    const id = req.params.orderId
    res.status(200).json({
        message: 'Handling GET requests to /orders/orderId',
        id
    })
})

router.delete('/:orderId', (req, res) => {
    const id = req.params.orderId
    res.status(200).json({
        message: 'Handling DELETE requests to /orders/orderId',
        id
    })
})

module.exports = router