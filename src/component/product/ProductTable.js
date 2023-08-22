import axios from "axios";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "./product.css";
import Modal from "../popup/ProductModal";
import UpdateModal from "../popup/UpdateModal";
const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [deleteProduct, setDeleteProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updateProduct, setUpdateProduct] = useState(null);
  const [search, setSearch] = useState('')
  console.log(search)
  const handleView = (product) => {
    setSelectedProduct(product);
  };

  const url = "https://fakestoreapi.com/products";
  useEffect(() => {
    axios.get(url).then((response) => {
      setProducts(response.data);
    });
  }, []);

  const handleUpdate = (product, newName) => {
    const updatedProducts = products.map(product =>
      product.id === product ? { ...product, name: newName } : product
    );
    setProducts(updatedProducts);
    console.log(`Product with ID ${product.id} updated with new name: ${newName}`);
    setUpdateProduct(product);
  };


  const handleDelete = (product) => {
    const updatedProducts = deleteProduct.filter(product => product.id !== product);
    setDeleteProducts(updatedProducts);
    console.log(`Product with ID ${product.id} deleted.`);
  };

  return (
    <>
      <div>
        <div className="search-input">
          <input type="search" placeholder="Search...." id="search" name="" onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Table striped bordered hover variant="dark" id="myTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Title</th>
              <th>Product Price</th>
              <th>Product Description</th>
              <th>Product Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.filter((product) => {
              return search.toLowerCase() === '' ? product: product.title.toLowerCase().includes(search)
              }
            ).map((product) => (
              <tr key={product.id}>
                <td width={50}>{product.id}</td>
                <td width={200}>{product.title}</td>
                <td width={150}>{product.price}</td>
                <td width={600} style={{ textAlign: "left" }}>
                  {product.description}
                </td>
                <td width={200}>{product.category}</td>
                <td
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <button onClick={() => handleView(product)}>
                    <i
                      className="fa-solid fa-eye"
                      style={{ color: "#005eff" }}
                    ></i>
                  </button>
                  <button onClick={() => handleUpdate(product)}>
                    <i
                      className="fa-solid fa-pen"
                      style={{ color: "#00000" }}
                    ></i>
                  </button>
                  <button onClick={() => handleDelete(product)}>
                    <i
                      className="fa-solid fa-trash"
                      style={{ color: "#ff0000" }}
                    ></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal
          isOpen={selectedProduct !== null}
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct || {}}
        />
        <UpdateModal
          isOpen={updateProduct !== null}
          onClose={() => setUpdateProduct(null)}
          product={updateProduct || {}}
        />
      </div>
    </>
  );
};

export default ProductTable;
