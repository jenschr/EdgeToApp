import { useState, React, useEffect } from "react";

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
    <div>
      <button onClick={handleClick} className={added ? "outline" : ""}>
        {props.name}
      </button>
    </div>
  );
};

export default Product;
