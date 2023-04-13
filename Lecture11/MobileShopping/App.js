import { StatusBar } from "expo-status-bar";
import { Dimensions, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";

import { useEffect, useState, React } from "react";
import ShoppingList from "./components/ShoppingList";
import ProductListing from "./components/ProductListing";

export default function App() {
  const [itemsInList, setItemsInList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [host, setHost] = useState("http://192.168.1.127:3001");

  useEffect(() => {
    fetch(host + "/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProductList(data);
        selectFiveAtRandom();
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
      <Layout style={styles.container}>
        <SafeAreaView style={styles.container}>
          <Text on onPress={selectFiveAtRandom} category="h1">
            Shopping list
          </Text>
          <Text category="p1">Scroll and tap items to add to your list</Text>
          <ScrollView style={styles.scroller}>
            <ShoppingList itemsInList={itemsInList} />
            <ProductListing
              productList={productList}
              addToListHandler={addToListHandler}
              alreadyInList={itemsInList}
            />
          </ScrollView>
        </SafeAreaView>
      </Layout>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    borderColor: "black",
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  scroller: {
    width: Dimensions.get("window").width - 40,
  },
});
