import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';

function Products() {
  const [products, setProducts] = useState([]);
  // Add product fetching logic here

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;