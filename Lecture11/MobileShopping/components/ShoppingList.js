import { Layout } from "@ui-kitten/components";
import { React, useState } from "react";
import { TextInput, Switch, Text, StyleSheet } from "react-native";
import ShoppingListItem from "./ShoppingListItem";

const ShoppingList = (props) => {
  return (
    <Layout style={styles.container} level="1">
      {props.itemsInList?.map((item) => (
        <ShoppingListItem key={item} itemName={item} />
      ))}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  toggle: {
    margin: 2,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 8,
    padding: 6,
  },
});

export default ShoppingList;
