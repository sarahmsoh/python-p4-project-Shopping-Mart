import React, { useState } from 'react';
import '../styles/ProductForm.css';
import axios from 'axios';

function ProductForm() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    image: '',  // Added image field
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:5000/products', product)
      .then(response => {
        console.log('Product added:', product);
      })
      .catch(err => console.log(err)); // Added error handling
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
        image URL:
        <input type="text" name="image" value={product.image} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Add Product</button>
    </form>
  );
}

export default ProductForm;
