// import React from 'react';
// // import styles from './NavBar.module.css';
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// import '../styles/Navbar.css';
// import Home from './Home ';
// import ProductForm from './ProductForm';
// import SearchProducts from './Search';



// function NavBar({ onLogout }) {
//   return (
//     <Router>
//       <div>
//       <nav className='navbar'>
//         <div className='navLinks'>
//         <Link to="/login" className='navLink'>
//             Login
//           </Link>
//           <Link to="/home" className='navLink'>
//             Home
//           </Link>
//           <Link to="/ProductForm" className='navLink'>
//             Create Product
//           </Link>
//           <Link to = "/Search" className='navLink'>
//             Search Product
//           </Link>
//           <Link to = "/Order" className='navLink'>
//             Order
//           </Link>
//         </div>
//         <button className='logoutButton' onClick={onLogout}>
//           Logout
//         </button>
//       </nav>
//       <Switch>
//         <Route path="/home" element={<Home />} />
//         <Route path="/ProductForm" element={<ProductForm />} />
//         <Route path="/Search" element={<SearchProducts />} />
//       </Switch>

//       </div>
//     </Router>

//   );
// }

// export default NavBar;
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
      <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      
        <li>
          <Link to="/newproduct">New Product</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
        <li>
          <Link to="/order">Order</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;