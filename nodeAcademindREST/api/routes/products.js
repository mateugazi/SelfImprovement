const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    })
})

router.post('/', (req, res) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(201).json({
        message: 'Handling POST requests to /products',
        product
    })
})

router.get('/:productId', (req, res) => {
    const id = req.params.productId
    if (id === 'special') {
        res.status(200).json({
            message: "this is special id",
            id
        })
    } else {
        res.status(200).json({
            message: 'you passed an id',
            id
        })
    }
})

router.put('/:productId', (req, res) => {
    res.status(200).json({
        message: 'Handling PUT requests to /products'
    })
})

router.delete('/:productId', (req, res) => {
    res.status(200).json({
        message: 'Handling DELETE requests to /products'
    })
})


module.exports = router