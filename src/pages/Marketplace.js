import React, { useState } from 'react';

function Marketplace() {
  const [products] = useState([
    {
      id: 1,
      name: "Gaming Laptop",
      description: "High-performance gaming laptop with RTX 3080",
      price: 1000,
      image: "https://via.placeholder.com/300x200",
      seller: "0x1234...5678"
    },
    {
      id: 2,
      name: "4K Monitor",
      description: "32-inch 4K Ultra HD Monitor",
      price: 500,
      image: "https://via.placeholder.com/300x200",
      seller: "0x8765...4321"
    },
    // Add more products as needed
  ]);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Electronics Marketplace</h1>
        <p className="text-blue-200">Browse and buy electronics using TECH tokens</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-blue-600">
                  {product.price} TECH
                </span>
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => {/* Implement purchase logic */}}
                >
                  Buy Now
                </button>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Seller: {product.seller}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marketplace;