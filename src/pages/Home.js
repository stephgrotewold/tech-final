import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="text-center">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          Welcome to our Electronics Marketplace
        </h1>
        <p className="text-gray-600 mb-6">
          Connect your wallet to start buying and selling electronics.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/marketplace"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Browse Products
          </Link>
          <Link
            to="/faucet"
            className="bg-blue-100 text-blue-900 px-6 py-2 rounded-lg hover:bg-blue-200"
          >
            Get TECH Tokens
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-blue-900 mb-2">Buy Electronics</h3>
          <p className="text-gray-600">Browse our selection of high-quality electronics</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-blue-900 mb-2">Get TECH Tokens</h3>
          <p className="text-gray-600">Use our faucet to get tokens for trading</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-blue-900 mb-2">Sell Products</h3>
          <p className="text-gray-600">List your electronics for sale</p>
        </div>
      </div>
    </div>
  );
}

export default Home;