import React, { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import Footer from "../components/Footer";

function ProductEdit(props) {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/productedit/:id");
  const [ID, setID] = useState("");
  const [name, setName] = useState("");
  const [categories, setCategories] = useState("");

  useEffect(() => {
    setID(params?.id);

    if (params?.id) {
      fetch("http://localhost:3001/products/" + params.id)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setName(data.name);
          setCategories(data.categories);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, []);

  const updateName = (e) => {
    const newName = e.target.value;
    if (newName.length < 50) {
      setName(newName);
    }
  };

  const updateCategories = (e) => {
    const newName = e.target.value;
    if (newName.length < 50) {
      setCategories(newName);
      console.log(newName);
    }
  };

  const updateProduct = () => {
    if (ID && name.length > 0 && categories.length > 0) {
      fetch(
        "http://localhost:3001/products/" +
          ID +
          "?name=" +
          name +
          "&categories=" +
          categories +
          "",
        {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Updated:", data);
          setLocation("/productlist");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const saveNewProduct = () => {
    console.log("saveNewProduct");
    if (name.length < 2) {
      alert("You must add a name");
    } else if (categories.length < 2) {
      alert("You must add a category");
    } else {
      const dataToSave = {
        name: name,
        categories: categories,
        _id: ID,
      };

      fetch("http://localhost:3001/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSave),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Saved:", data);
          setLocation("/productlist");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const deleteProduct = () => {
    if (ID && name.length > 0 && name.length < 50) {
      fetch("http://localhost:3001/products/" + ID, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Deleted:", data);
          setLocation("/productlist");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <article id="article">
      <h2>Edit {params?.id}</h2>
      <input
        type="text"
        value={name}
        onChange={updateName}
        placeholder="Type a product name here"
      ></input>
      <input
        type="text"
        value={categories}
        onChange={updateCategories}
        placeholder="Type a category here"
      ></input>

      {ID > "" ? (
        <>
          <button onClick={updateProduct}>Save</button>
          <button onClick={deleteProduct} className="delete">
            Delete
          </button>
        </>
      ) : (
        <button onClick={saveNewProduct}>Add product</button>
      )}

      <Footer />
    </article>
  );
}

export default ProductEdit;
