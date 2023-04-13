import React, { useEffect, useState } from "react";
import Product from "./Product";

function ProductListing(props) {
  let isItemInList = (name) => {
    return props.alreadyInList?.filter((item) => item === name).length > 0;
  };

  return (
    <>
      {props.productList.map((product) => (
        <Product
          key={product._id}
          name={product.name}
          isSelected={isItemInList(product.name)}
          addToListHandler={props.addToListHandler}
        />
      ))}
    </>
  );
}

export default ProductListing;
