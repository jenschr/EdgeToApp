import React, { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";

const HOST = process.env.HOST || "http://192.168.1.127:3001";

export default function ProductList() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/productedit/:id");
  const [name, setName] = useState("");
  const [categories, setCategories] = useState("");
  const [ID, setID] = useState("");
  const [showModal, setShowModal] = useState("");
  const [modalText, setModalText] = useState("");

  useEffect(() => {
    // We only lookup if we have a vaild ID
    if (params && params.id) {
      fetch(HOST + "/products/" + params.id)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setName(data.name);
          setCategories(data.categories);
          setID(data._id);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [match]);

  const updateName = (e) => {
    const newName = e.target.value;
    if (newName.length < 50) {
      setName(newName);
      console.log(newName);
    }
  };

  const updateCategories = (e) => {
    const newName = e.target.value;
    if (newName.length < 50) {
      setCategories(newName);
      console.log(newName);
    }
  };

  const saveNewProduct = () => {
    console.log("saveNewProduct");
    if (name.length < 2) {
      setModalText("You must add a name");
      setShowModal("open");
    } else if (categories.length < 2) {
      setModalText("You must add a category");
      setShowModal("open");
    } else {
      const dataToSave = {
        name: name,
        categories: categories,
        _id: ID,
      };

      fetch(HOST + "/products/", {
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

  const shouldWeDeleteProduct = () => {
    setModalText(
      "Delete product with ID " + ID + "? (Deleting cannot be undone!)"
    );
    setShowModal("open");
  };

  const deleteProduct = () => {
    if (ID && name.length > 0 && name.length < 50) {
      fetch(HOST + "/products/" + ID, {
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

  const updateProduct = () => {
    if (ID && name.length > 0 && name.length < 50) {
      fetch(
        HOST +
          "/products/" +
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

  const confirmModal = () => {
    ID !== "" ? deleteProduct() : setShowModal("");
  };

  return (
    <article id="article">
      <dialog open={showModal}>
        <article>
          <header>
            <a
              href="#close"
              aria-label="Close"
              className="close"
              onClick={() => setShowModal("")}
            ></a>
            Alert
          </header>
          <p>{modalText}</p>
          <footer>
            <a
              href="#confirm"
              role="button"
              data-target="modal-example"
              onClick={confirmModal}
            >
              Confirm
            </a>
          </footer>
        </article>
      </dialog>
      <h2>{params?.id ? "Edit" : "New Product"}</h2>
      <input
        type="text"
        placeholder="Type a product name here"
        onChange={updateName}
        value={name}
      ></input>
      <input
        type="text"
        placeholder="Type a category here"
        onChange={updateCategories}
        value={categories}
      ></input>
      <button onClick={ID !== "" ? updateProduct : saveNewProduct}>Save</button>
      {ID !== "" ? (
        <button onClick={shouldWeDeleteProduct} className="outline">
          Delete
        </button>
      ) : (
        <br />
      )}
      <footer>
        <small>(CC) Høyskolen Kristiania 2023</small>
      </footer>
    </article>
  );
}
