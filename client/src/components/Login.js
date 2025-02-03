import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
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
          <label htmlFor="username" className='label'>Username:</label>
          <input
            type="text"
            id="username"
            value={username}
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
