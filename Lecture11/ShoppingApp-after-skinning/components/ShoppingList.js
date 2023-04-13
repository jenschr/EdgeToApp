import { Toggle } from "@ui-kitten/components";
import { React, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import ShoppingListItem from "./ShoppingListItem";

const ShoppingList = (props) => {
  return (
    <View style={styles.container}>
      {props.itemsInList.map((item) => (
        <ShoppingListItem key={item} item={item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default ShoppingList;
