const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.post('/', function (req, res, next) {
  res.send('<a href="add">Add product</a>');
  console.log(req.body.name);
})

app.get('/', function (req, res) {
  res.send('<a href="add">Add product</a>');
})

app.get('/add', function (req, res) {
  res.sendFile("addProduct.html", { root: __dirname });
})

app.listen(3000);