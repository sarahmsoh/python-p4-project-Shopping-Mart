import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Login.css';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleUsernameChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/login', { email, password })
      .then(response => {
        console.log(response.data);
        // Handle login response here
      })
      .catch(error => {
        console.error(error);
        // Handle login error here
      });

    if (email && password) {
      // Handle login directly here (e.g., setting a logged-in state)
      localStorage.setItem('isLoggedIn', 'true'); // Save login status in localStorage
      history.push('/home'); // Redirect to home page after login
    } else {
      alert('Please enter your username and password');
    }
  };

  return (

    <div className='login'>
       <p>Hello User <br></br>Please log in first to gain access to the ShoppingMart. Enjoy a seamless shopping experience once you Login!</p>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className='loginForm'>
        <div className='formGroup'>
          <label htmlFor="username" className='label'>Email:</label>
          <input
            type="text"
            id="username"
            value={email}
            onChange={handleUsernameChange}
            className={Login}
            required
          />
        </div>
        <div className='formGroup'>
          <label htmlFor="password" className='label'>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className={Login}
            required
          />
        </div>
        <button type="submit" className='loginButton'>Login</button>
      </form>
    </div>
  );
}

export default Login;
