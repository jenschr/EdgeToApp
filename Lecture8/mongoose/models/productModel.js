const mongoose = require("mongoose");
mongoose.set('strictQuery', true);  

const productSchema = mongoose.Schema({
    name: String,
    categories: [String],
    modifiedDate: {type:Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);
