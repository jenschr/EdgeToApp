import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Footer from "../components/Footer";
import { CgAdd, CgPen } from "react-icons/cg";

function ProductList(props) {
  const [location, setLocation] = useLocation();
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
    <article id="article">
      <h2>Products</h2>
      <section id="tables">
        <figure>
          <table role="grid">
            <thead>
              <tr>
                <th scope="col" onClick={() => setLocation("/productedit/")}>
                  <CgAdd />
                </th>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">ID</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((item, index) => (
                <tr
                  key={item._id}
                  onClick={() => setLocation("/productedit/" + item._id)}
                >
                  <th scope="row">
                    <CgPen />
                  </th>
                  <td>{item.name}</td>
                  <td>{item.categories}</td>
                  <td>{item._id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      </section>
      <Footer />
    </article>
  );
}

export default ProductList;
