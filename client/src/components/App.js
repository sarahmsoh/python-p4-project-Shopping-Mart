import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from './ProductList';
import Navbar from './Navbar';
import '../styles/App.css';
import Home from './Home ';
import ProductForm from './ProductForm';
import Search from './Search';
import Order from './Order';
import Login from './Login';
import Signup from './Signup';
import Footer from './Footer';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
      
        <ProductList />
        <Switch>
          {/* Default route (Home page) */}
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/products" component={ProductList} />
          <Route path="/newproduct" component={ProductForm} />
          <Route path="/search" component={Search} />
          <Route path="/order" component={Order} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
