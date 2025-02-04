import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SearchProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    axios
    .get(`http://127.0.0.1:5000/search?name=${searchTerm}`)
    .then(data => {
        console.log('Data:', data);
        if (data) {
          setResults(data);
        } else {
          console.log('No data found');
        }
      })
      .catch(err => console.log('Error:', err));
  };

  return (
    <div>
      <h1>Search Products</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by product name"
      />
      <button onClick={handleSearch}>Search</button>

    <ul>
      {results.map(product => (
        <li key={product.id}>
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </li>
      ))}
    </ul>
    </div>
  );
}

export default SearchProducts;
