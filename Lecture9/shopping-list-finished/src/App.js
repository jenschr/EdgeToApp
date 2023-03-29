import "./App.css";
import { useState, React } from "react";
import ShoppingList from "./components/ShoppingList";
import ProductListing from "./components/ProductListing";

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

function App() {
  const [itemsInList, setItemsInList] = useState([]);
  let addToListHandler = (isAdded, itemName) => {
    if (isAdded) {
      setItemsInList([...itemsInList, itemName]);
    } else {
      let itemsWithOneRemoved = itemsInList.filter((item) => item !== itemName);
      setItemsInList(itemsWithOneRemoved);
    }
  };

  let selectFiveAtRandom = () => {
    // Build an array of all possible items
    const allThingsArray = [];
    for (let i = 0; i < productList.length; i++) {
      allThingsArray.push(i);
    }

    // Select five of these
    const fiveThingsArray = [];
    for (let i = 0; i < 5; i++) {
      const randomNumber = Math.floor(Math.random() * allThingsArray.length);
      // Ensure we only suggest items once, by splicing
      const uniqueNumber = allThingsArray.splice(randomNumber, 1);
      const randomItem = productList[uniqueNumber];
      fiveThingsArray.push(randomItem.name);
    }
    setItemsInList(fiveThingsArray);
  };

  return (
    <div>
      <header className="container">
        <hgroup>
          <h1 onDoubleClick={selectFiveAtRandom}>Shopping list</h1>
          <p>Scroll and tap items to add to your list</p>
        </hgroup>
      </header>

      <article>
        <main className="container">
          <hgroup>
            <ShoppingList itemsInList={itemsInList} />
          </hgroup>
          <section>
            <ProductListing
              addToListHandler={addToListHandler}
              alreadyInList={itemsInList}
              productList={productList}
            />
          </section>
        </main>
      </article>

      <footer className="container">
        (CC-BY-SA 4.0) Høyskolen Kristiania 2023
      </footer>
    </div>
  );
}

export default App;
