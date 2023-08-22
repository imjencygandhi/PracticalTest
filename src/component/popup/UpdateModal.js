import React, { useState } from "react";
import "./Modal.css";

const UpdateModal = ({ isOpen, onClose, product }) => {
    const [products, setProducts] = useState([]);
    if (!isOpen) {
        return null;
    }
    const handleUpdate = (product, newName) => {
        const updatedProducts = products.map(product =>
            product.id === product ? { ...product, name: newName } : product
        );
        setProducts(updatedProducts);
        console.log(`Product with ID ${product} updated with new name: ${newName}`);
    };
    const handleSubmit = (event, product) => {
        event.preventDefault();
        const newName = event.target.elements.newName.value;

        if (newName) {
            handleUpdate(product.id, newName);
        } else {
            alert('Please enter a valid name.');
        }
    };
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span>{product.title}</span>
                <form onSubmit={(event) => handleSubmit(event, product.id)} className="form">
                    <input type="text" name="newName" placeholder="Enter new product name" />
                    <button type="submit" className="submit-btn">Submit</button>
                </form>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default UpdateModal;
