import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import NavBar from './Navbar';

function Home(){

  return (
    <div className='homeContainer'>


      {/* Content of the home page */}
      <div className='homeContent'>
        <h1>Welcome to ShoppingMart</h1>
        <h3>ShopEasy with us🎉</h3>
        <p>Start Shopping!</p>
      </div>


    </div>
  );
}

export default Home;