import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Signup.css';
import { Link } from 'react-router-dom';

function Signup() {
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      axios
        .post('http://127.0.0.1:5000/signup', { name, email, password })
        .then((response) => {
          console.log(response.data);
          // Handle success message or redirect
        })
        .catch((error) => {
          console.error(error.response.data);
          alert(error.response.data.message);
          // Handle error message
        });
    }

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group relative">
          <label>Password:</label>
          <input
            type={password ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setPassword(!password)}
          >
            {password ? 'Hide' : 'Show'}
          </button>
        </div>

        <button type="submit">Signup</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;