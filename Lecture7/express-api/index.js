const express = require('express');
const app = express();
const products = require('./routes/products');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/products",products);

app.get('/', function (req, res) {
  res.send('<a href="add">Add product</a>');
})

app.get('/add', function (req, res) {
  res.sendFile("addProduct.html", { root: __dirname });
})

app.listen(3000);