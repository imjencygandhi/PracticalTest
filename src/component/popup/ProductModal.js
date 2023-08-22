import React from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, product }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Product Details</h2>
        <div className="image">
          <img src={product.image} alt="" />
        </div>
        <p>
          <strong>Title:</strong> {product.title}
        </p>
        <p>
          <strong>Price:</strong> {product.price}
        </p>
        <p>
          <strong>Description:</strong> {product.description}
        </p>
        <p>
          <strong>Category:</strong> {product.category}
        </p>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
