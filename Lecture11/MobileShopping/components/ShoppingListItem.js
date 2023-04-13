import { Text, Toggle } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { StyleSheet, Switch, View } from "react-native";

function ShoppingListItem(props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = (e) => {
    setIsEnabled(!isEnabled);
  };

  useEffect(() => {
    console.log("name: ", props);
  }, []);

  return (
    <View style={styles.controlContainer}>
      <Toggle
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        onChange={toggleSwitch}
        checked={isEnabled}
      >
        <Text>{props.itemName}</Text>
      </Toggle>
    </View>
  );
}

const styles = StyleSheet.create({
  toggle: {
    margin: 2,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 8,
    padding: 6,
  },
});

export default ShoppingListItem;
