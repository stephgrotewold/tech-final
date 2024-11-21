// src/pages/Marketplace.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import { ethers } from 'ethers';
import { MARKETPLACE_ADDRESS } from '../contracts/marketplace';

function Marketplace() {
  const navigate = useNavigate();
  const { account, contract, connectWallet, updateBalance } = useWeb3();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Computers', 'Phones', 'Accessories'];

  // Función para cargar productos del smart contract
  const loadProducts = async () => {
    try {
      if (contract.marketplace) {
        console.log('Loading products from marketplace...');
        const items = await contract.marketplace.getActiveItems();
        console.log('Raw items:', items);
        
        const formattedItems = items.map(item => ({
          id: item.id.toString(),
          name: item.name,
          description: item.description,
          price: ethers.utils.formatUnits(item.price, 18),
          image: item.imageUrl,
          seller: item.seller,
          category: item.category,
          isActive: item.isActive
        }));
        
        console.log('Formatted items:', formattedItems);
        setProducts(formattedItems);
      }
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar productos cuando el contrato esté disponible
  useEffect(() => {
    if (contract.marketplace) {
      loadProducts();
    }
  }, [contract.marketplace]);

  const handleBuyClick = async (product) => {
    if (!account) {
      try {
        const success = await connectWallet();
        if (success) {
          navigate('/profile-select');
        }
      } catch (error) {
        console.error('Connection error:', error);
      }
      return;
    }

    try {
      console.log('Buying product:', product);
      
      // Primero aprobar el gasto de tokens
      const priceInWei = ethers.utils.parseUnits(product.price.toString(), 18);
      
      console.log('Approving tokens...');
      const approveTx = await contract.token.approve(
        MARKETPLACE_ADDRESS,
        priceInWei
      );
      await approveTx.wait();
      console.log('Tokens approved');

      // Luego comprar el item
      console.log('Buying item...');
      const buyTx = await contract.marketplace.buyItem(product.id);
      await buyTx.wait();
      console.log('Item bought');

      // Actualizar el balance y recargar productos
      await updateBalance(account);
      await loadProducts();
      
      alert('Purchase successful!');
    } catch (error) {
      console.error('Purchase error:', error);
      alert('Error making purchase. Please try again.');
    }
  };

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

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-white text-lg">Loading products...</p>
        </div>
      )}

      {/* Products Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={product.image || "https://via.placeholder.com/300x200"} 
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
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      account 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
                    }`}
                    onClick={() => handleBuyClick(product)}
                  >
                    {account ? 'Buy Now' : 'Connect to Buy'}
                  </button>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  Seller: {product.seller}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredProducts.length === 0 && (
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