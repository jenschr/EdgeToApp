const express = require('express');
const router = express.Router();

let products = [{"id":0,"name":"FirstProd"},{"id":1,"name":"SecondProd"}];

router.get('/', function (req, res) {
    res.status(200).json(products);
})

router.post('/', function (req, res, next) {
    const product = {"id":products.length,"name":req.body.name};
    products.push(product);
    res.status(201).json(products);
})

router.get('/:id', function (req, res) {
    const singleProduct = products.find(p => p.id === parseInt(req.params.id));
    if(!singleProduct) return res.status(404).json("{}");
    res.status(200).json(singleProduct);
})

router.put('/:id', function (req, res) {
    const singleProduct = products.find(p => p.id === parseInt(req.params.id));
    if(!singleProduct) return res.status(404).json("{}");
    singleProduct.name = req.query.name;
    res.status(200).json(singleProduct);
})

router.delete('/:id', function (req, res) {
    const singleProduct = products.find(p => p.id === parseInt(req.params.id));
    if(!singleProduct) return res.status(404).json("{}");
    const index = products.indexOf(singleProduct);
    const deleted = products.splice(index,1);
    res.status(200).json(deleted);
})

module.exports = router;