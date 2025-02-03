import React, { useState } from 'react';
import '../styles/Signup.css'; // Assuming you're using a custom CSS file
import { Link } from 'react-router-dom'; // For navigation
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    // const handleSubmit = async (e) => {
    // e.preventDefault();    // setError('');  // Reset error on submit

    // Basic client-side validation
    // if (!name || !email || !password || !confirmPassword) {
    //   setError('Please fill in all fields.');
    //   return;
    // }

    // if (password !== confirmPassword) {
    //   setError('Passwords do not match');
    //   return;
    // }

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
          <label>Username:</label>
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

        {/* <div className="form-group relative">
          <label>Confirm Password:</label>
          <input
            type={confirmPasswordShown ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setConfirmPasswordShown(!confirmPasswordShown)}
          >
            {confirmPasswordShown ? 'Hide' : 'Show'}
          </button>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>} */}

        <button type="submit"  onClick={handleSubmit} >Signup</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;