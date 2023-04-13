import React, { useEffect, useState } from "react";
import Product from "./Product";

function ProductListing(props) {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.127:3001/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProductList(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      {productList.map((product) => (
        <Product
          key={product._id}
          name={product.name}
          addToListHandler={props.addToListHandler}
        />
      ))}
    </>
  );
}

export default ProductListing;
