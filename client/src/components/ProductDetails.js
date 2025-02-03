import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  return (
    <div>
      {product ? (
        <>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <h3>Reviews</h3>
          <ul>
            {product.reviews.map(review => (
              <li key={review.id}>{review.content} - Rating: {review.rating}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductDetail;
