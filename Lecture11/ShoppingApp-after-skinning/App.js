import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import ShoppingList from "./components/ShoppingList";
import ProductListing from "./components/ProductListing";
import { useEffect, useState } from "react";

import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";

export default function App() {
  const [itemsInList, setItemsInList] = useState([]);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.127:3001/products")
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
    console.log("selectFiveAtRandom?");
    // exit if no items
    if (productList.length <= 0) return;

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
    <ApplicationProvider {...eva} theme={eva.light}>
      <SafeAreaView style={styles.container}>
        <Text category="h1" onPress={selectFiveAtRandom}>
          Shopping list
        </Text>
        <Text category="p1">Scroll and tap items to add to your list</Text>
        <ScrollView style={styles.scroller}>
          <ShoppingList itemsInList={itemsInList} />
          <ProductListing
            addToListHandler={addToListHandler}
            productList={productList}
            alreadyInList={itemsInList}
          />
          <Text category="c2" className="container">
            (CC-BY-SA 4.0) Høyskolen Kristiania 2023
          </Text>
        </ScrollView>
      </SafeAreaView>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    margin: 20,
  },
});
