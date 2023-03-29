import React from "react";
import Product from "./Product";

const productList = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Avocado" },
  { id: 3, name: "Bagels" },
  { id: 4, name: "Banana" },
  { id: 5, name: "Basil" },
  { id: 6, name: "Bread" },
  { id: 7, name: "Broccoli" },
  { id: 8, name: "Butter" },
  { id: 9, name: "Carrots" },
  { id: 10, name: "Cereal" },
  { id: 11, name: "Chicken" },
  { id: 12, name: "Cheese" },
  { id: 13, name: "Chilli powder" },
  { id: 14, name: "Coffee" },
  { id: 15, name: "Cooking oil" },
  { id: 16, name: "Coriander" },
  { id: 17, name: "Cucumber" },
  { id: 18, name: "Eggs" },
  { id: 19, name: "Fish" },
  { id: 20, name: "Flour" },
  { id: 21, name: "Garlic" },
  { id: 22, name: "Grapes" },
  { id: 23, name: "Honey" },
  { id: 24, name: "Ice cream" },
  { id: 25, name: "Ketchup" },
  { id: 26, name: "Mango" },
  { id: 27, name: "Melon" },
  { id: 28, name: "Meat" },
  { id: 29, name: "Milk" },
  { id: 30, name: "Mixed vegetables" },
  { id: 31, name: "Mustard" },
  { id: 32, name: "Noodles" },
  { id: 33, name: "Onions" },
  { id: 34, name: "Olives" },
  { id: 35, name: "Oranges" },
  { id: 36, name: "Pasta" },
  { id: 37, name: "Paprika" },
  { id: 38, name: "Peas" },
  { id: 39, name: "Pepper" },
  { id: 40, name: "Pepsi" },
  { id: 41, name: "Potato" },
  { id: 42, name: "Rice" },
  { id: 43, name: "Lettuce" },
  { id: 44, name: "Salsa" },
  { id: 45, name: "Salt" },
  { id: 46, name: "Sausages" },
  { id: 47, name: "Seafood" },
  { id: 48, name: "Soy sauce" },
  { id: 49, name: "Spinach" },
  { id: 50, name: "Sugar" },
  { id: 51, name: "Tacos" },
  { id: 52, name: "Tea" },
  { id: 53, name: "Tofu" },
  { id: 54, name: "Tomato" },
  { id: 55, name: "Yoghurt" },
  { id: 56, name: "Vinegar" },
];

function ProductListing(props) {
  return (
    <div>
      {productList.map((product) => (
        <Product
          key={product._id}
          name={product.name}
          addToListHandler={props.addToListHandler}
        />
      ))}
    </div>
  );
}

export default ProductListing;
