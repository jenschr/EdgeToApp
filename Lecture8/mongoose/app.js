const mongoose = require("mongoose");
const ProductModel = require("./models/productModel");
mongoose.set('strictQuery', true);

mongoose.connect("mongodb://localhost/MyNewDatabase")
    .then(()=>console.log("Connected to database"))
    .catch((error)=> console.error("Error:", error));

async function saveProduct(){
    try{
        const productInstance = new ProductModel({
            name: "MyEightProduct",
            categories: ["first","third","seventh"]
        })
        const saveResult = await productInstance.save();
        console.log("Saved: ",saveResult);
    } catch(error) {
        console.error("Error: ",error);
    }
}

async function getAllProducts(){
    const products = await ProductModel.find();
    console.log("All products:", products);
}

async function getLatestProducts( maxItems ){
    const products = await ProductModel.find()
        .limit(maxItems)
        .sort({ modifiedDate : "desc"});
    console.log("Last "+maxItems+" products:", products);
}

async function updateProduct( id, newName ){
    try {
        const product = await ProductModel.findById(id);
        
        // if we got a result, move on
        try {
            product.name = newName;
            const result = await product.save();
            console.log(result);
        } catch(error) {
            console.error("Error:", error);
        }
    } catch(error) {
        console.error("Error:", "No item with id ",id);
    }
}

async function deleteProduct( id ){
    try {
        const product = await ProductModel.deleteOne({_id:id});
        console.log("Deleted",product);
    } catch(error) {
        console.error("Error:", "No item with id ",id);
    }
}

deleteProduct("63de7dbe28c7d40909cefd6d");