import React, { useState } from 'react';

function Marketplace() {
  const [products] = useState([
    {
      id: 1,
      name: "Gaming Laptop",
      description: "High-performance gaming laptop with RTX 3080",
      price: 1000,
      image: "https://via.placeholder.com/300x200",
      seller: "0x1234...5678",
      category: "Computers"
    },
    {
      id: 2,
      name: "4K Monitor",
      description: "32-inch 4K Ultra HD Monitor",
      price: 500,
      image: "https://via.placeholder.com/300x200",
      seller: "0x8765...4321",
      category: "Accessories"
    },
    {
      id: 3,
      name: "iPhone 15 Pro",
      description: "Latest iPhone model with A17 chip",
      price: 800,
      image: "https://via.placeholder.com/300x200",
      seller: "0x9876...1234",
      category: "Phones"
    },
    // Puedes agregar más productos aquí
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Computers', 'Phones', 'Accessories'];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Electronics Marketplace</h1>
        <p className="text-blue-200">Browse and buy electronics using TECH tokens</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-lg p-4 mb-8">
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">Filter by:</span>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-blue-900">{product.name}</h3>
                <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                  {product.category}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-blue-600">
                  {product.price} TECH
                </span>
                <button 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => {/* Implementar lógica de compra */}}
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

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
}

export default Marketplace;