import { useState, React, useEffect } from "react";
import { Button } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

const Product = (props) => {
  const [added, setAdded] = useState(false);
  let handleClick = () => {
    setAdded(!added);
    props.addToListHandler(!added, props.name);
  };

  useEffect(() => {
    setAdded(props.isSelected);
  }, [props.isSelected]);

  return (
    <Button
      onPress={handleClick}
      style={styles.button}
      appearance={added ? "outline" : "filled"}
    >
      {props.name}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 2,
  },
});

export default Product;
