import React from "react";
import Product from "./Product";

function ProductListing(props) {
  let isItemInList = (name) => {
    return props.alreadyInList?.filter((item) => item === name).length > 0;
  };

  return (
    <>
      {props.productList?.map((product) => (
        <Product
          key={product._id}
          isSelected={isItemInList(product.name)}
          name={product.name}
          addToListHandler={props.addToListHandler}
        />
      ))}
    </>
  );
}

export default ProductListing;
