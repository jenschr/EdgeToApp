import { useState, React, useEffect } from "react";
import { Button } from "react-native";

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
    <>
      <Button
        title={props.name}
        onPress={handleClick}
        className={added ? "outline" : ""}
      ></Button>
    </>
  );
};

export default Product;
