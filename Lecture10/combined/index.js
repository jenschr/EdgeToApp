const express = require("express");
const app = express();
const morgan = require("morgan");
const products = require("./routes/products");
const cors = require("cors");

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://localhost/ShoppingList")
  .then(() => console.log("Connected to database"))
  .catch((error) => console.error("Error:", error));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use("/products", products);

app.get("/", function (req, res) {
  // Provide a basic HTML page on the root of the server
  res.write("<!DOCTYPE html>");
  res.write("<html style='font-family: Roboto, Arial, sans-serif;'>");
  res.write("<head><title>REST API</title></head>");
  res.write("<body><p>/products is implemented</p></body>");
  res.write("</html>");
  res.end();
});
/*
const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', function () {
  client.subscribe('jensaIsTesting', function (err) {
    if (!err) {
      client.publish('jensaIsTesting', 'Hello Jensa')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  //client.end()
})
*/
app.listen(3001);
