import "./App.css";
import { useEffect, useState, React } from "react";
import ShoppingList from "./components/ShoppingList";
import ProductListing from "./components/ProductListing";

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

  return (
    <div>
      <header className="container">
        <hgroup>
          <h1>Shopping list</h1>
          <p>Scroll and tap items to add to your list</p>
        </hgroup>
      </header>

      <article>
        <main className="container">
          <hgroup>
            <ShoppingList itemsInList={itemsInList} />
          </hgroup>
          <section>
            <ProductListing addToListHandler={addToListHandler} />
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
