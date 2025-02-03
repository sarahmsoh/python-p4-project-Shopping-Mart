import React from 'react';

function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={footerContentStyle}>
        <p>&copy; 2025 ShoppingMart | All Rights Reserved</p>
        <nav>
          <a href="#privacy" style={linkStyle}>Privacy Policy</a>
          <a href="#terms" style={linkStyle}>Terms of Service</a>
        </nav>
      </div>
    </footer>
  );
}

const footerStyle = {
  backgroundColor: '#223', // corrected hex code
  color: 'white',
  padding: '10px 0',
  textAlign: 'center',
};

const footerContentStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 10px',
};

const linkStyle = {
  color: 'white',
  marginRight: '20px',
  textDecoration: 'none',
  transition: 'color 0.3s',
  cursor: 'pointer',
};

export default Footer;
