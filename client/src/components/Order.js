import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const OrderForm = () => {
  const [formData, setFormData] = useState({ productId: '', quantity: 1, userId: 1 });
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://127.0.0.1:5000/create_order', formData)
      .then(response => response.data)
      .then(data => {
        console.log(data);
        history.push('/products'); // Redirect to products page
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select value={formData.productId} onChange={(e) => setFormData({ ...formData, productId: e.target.value })}>
          <option value="">Select Product</option>
          <option value="1">Product 1</option>
          <option value="2">Product 2</option>
          <option value="3">Product 3</option>
          <option value="4">Product 4</option>
          <option value="5">Product 5</option>
        </select>
        <input
          type="number"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
        />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
