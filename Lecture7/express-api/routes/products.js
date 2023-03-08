const express = require('express');
const router = express.Router();

let products = [{"id":0,"name":"FirstProd"},{"id":1,"name":"SecondProd"}];

router.get('/', function (req, res) {
    res.send(JSON.stringify(products));
})

router.post('/', function (req, res, next) {
    const product = {"id":products.length,"name":req.body.name};
    products.push(product);
    res.send(JSON.stringify(products));
})

router.get('/:id', function (req, res) {
    const singleProduct = products.find(p => p.id === parseInt(req.params.id));
    if(!singleProduct) return res.status(404).send("{}");
    res.send(JSON.stringify(singleProduct));
})

router.put('/:id', function (req, res) {
    const singleProduct = products.find(p => p.id === parseInt(req.params.id));
    if(!singleProduct) return res.status(404).send("{}");
    singleProduct.name = req.query.name;
    res.send(JSON.stringify(singleProduct));
})

router.delete('/:id', function (req, res) {
    const singleProduct = products.find(p => p.id === parseInt(req.params.id));
    if(!singleProduct) return res.status(404).send("{}");
    
    const index = products.indexOf(singleProduct);
    const deleted = products.splice(index,1);
    res.send(JSON.stringify(deleted));
})

module.exports = router;