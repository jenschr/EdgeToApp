import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ShoppingList from "./components/ShoppingList";
import ProductListing from "./components/ProductListing";
import { useState } from "react";

export default function App() {
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
    <View style={styles.container}>
      <Text>Shopping list</Text>
      <Text>Scroll and tap items to add to your list</Text>
      <ShoppingList itemsInList={itemsInList} />
      <ProductListing addToListHandler={addToListHandler} />
      <Text className="container">
        (CC-BY-SA 4.0) Høyskolen Kristiania 2023
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
