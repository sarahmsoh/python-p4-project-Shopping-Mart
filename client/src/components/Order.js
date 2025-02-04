import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const OrderForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', productId: '', quantity: 1 });
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
    .post('http://127.0.0.1:5000/orders', formData)

    .then(response => response.json())
    .then(data => {
      console.log(data);
      history.push('/products'); // Redirect to products page
    })
    .catch(err => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <select value={formData.productId} onChange={(e) => setFormData({ ...formData, productId: e.target.value })}>
          <option value="">Select Product</option>
          <option value="1">Product 1</option>
          <option value="2">Product 2</option>
          <option value="3">Product 3</option>
          <option value="4">Product 4</option>
          <option value="5">Product 5</option>
        </select>
        <input type="number" placeholder="Quantity" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default OrderForm;