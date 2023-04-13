import React from "react";
import { Toggle } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

const ShoppingListItem = (props) => {
  const [checked, setChecked] = React.useState(false);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  return (
    <Toggle checked={checked} onChange={onCheckedChange} style={styles.padding}>
      {props.item}
    </Toggle>
  );
};

const styles = StyleSheet.create({
  padding: {
    borderRadius: 4,
    margin: 4,
    padding: 4,
  },
});

export default ShoppingListItem;
