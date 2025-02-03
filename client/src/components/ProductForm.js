import React, { useState } from 'react';
import '../styles/ProductForm.css';

function ProductForm() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Product added:', product);
    // Add product to database or API here
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      <label>
        Name:
        <input type="text" name="name" value={product.name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Description:
        <textarea name="description" value={product.description} onChange={handleChange} />
      </label>
      <br />
      <label>
        Price:
        <input type="number" name="price" value={product.price} onChange={handleChange} />
      </label>
      <br />
      <label>
        Quantity:
        <input type="number" name="quantity" value={product.quantity} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Add Product</button>
    </form>
  );
}

export default ProductForm;