import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';
import '../styles/productlist.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err.response.data));
      
  }, []);
  return (
    <div className='productList'>
      {products.map(product => (
        <ProductCard key={product.id} name={product.name} image={product.image} price={product.price} description={product.description} />
      ))}
    </div>
  );
}

export default ProductList;