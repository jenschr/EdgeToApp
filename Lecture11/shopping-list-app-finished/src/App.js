import "./App.css";
import { useEffect, useState, React } from "react";
import ShoppingList from "./components/ShoppingList";
import ProductListing from "./components/ProductListing";

function App() {
  const [itemsInList, setItemsInList] = useState([]);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProductList(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

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
