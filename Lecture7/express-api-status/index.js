const express = require('express');
const app = express();
const morgan = require('morgan');
const products = require('./routes/products');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use("/products",products);

app.get('/', function (req, res) {
  // Provide a basic HTML page on the root of the server
  res.write("<!DOCTYPE html>");
  res.write("<html style='font-family: Roboto, Arial, sans-serif;'>");
  res.write("<head><title>REST API</title></head>");
  res.write("<body><p>/products is implemented</p></body>");
  res.write("</html>")
  res.end();
})

app.listen(3000);