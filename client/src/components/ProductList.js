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
     {/* <ProductCard name='portable speaker' image='https://images.pexels.com/photos/9072408/pexels-photo-9072408.jpeg?auto=compress&cs=tinysrgb&w=600'  price={59.99} description={"Compact Bluetooth speaker with great sound quality."} />
     <ProductCard name='watch' image='https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600'  price={79.99} description={"A stylish smartwatch with fitness tracking and notifications."} />
     <ProductCard name='tv' image='https://images.pexels.com/photos/8089670/pexels-photo-8089670.jpeg?auto=compress&cs=tinysrgb&w=600'  price={599.99} description={"A 55-inch 4K UHD smart television with voice control."} />
     <ProductCard name='portable' image='https://images.pexels.com/photos/9072408/pexels-photo-9072408.jpeg?auto=compress&cs=tinysrgb&w=600' price={59.99} description={"Compact Bluetooth speaker with great sound quality."} /> */}

      {products.map(product => (
        <ProductCard key={product.id} name={product.name} image={product.image} price={product.price} description={product.description} />
      ))}
    </div>
  );
}

export default ProductList;