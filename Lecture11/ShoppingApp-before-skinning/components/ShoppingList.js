import { React } from "react";
import { Switch, Text } from "react-native";

const ShoppingList = (props) => {
  return (
    <>
      {props.itemsInList.map((item) => (
        <>
          <Switch></Switch>
          <Text>{item}</Text>
        </>
      ))}
    </>
  );
};

export default ShoppingList;
