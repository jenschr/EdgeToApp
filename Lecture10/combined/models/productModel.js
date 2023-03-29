const mongoose = require("mongoose");
mongoose.set('strictQuery', true);  

const productSchema = mongoose.Schema({
    name: {type: String, required: true },
    categories: [String],
    modifiedDate: {type:Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);
