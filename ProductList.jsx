import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { useCart } from '../context/CartContext'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart(); 

  useEffect(() => {
    axios.get('http://localhost:3030/products')
      .then(response => {
        setProducts(response.data.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={`/images/${product.image}`} alt={product.name} />
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
