import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="bg-white rounded-lg shadow-xl p-8 mb-12">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          Welcome to our Electronics Marketplace
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Buy and sell electronics using TECH tokens on our decentralized platform.
        </p>
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Connect Wallet
          </button>
          <Link to="/faucet" className="bg-blue-100 text-blue-900 px-6 py-3 rounded-lg hover:bg-blue-200 transition-colors">
            Get TECH Tokens
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-blue-900 mb-3">Browse Products</h3>
          <p className="text-gray-600 mb-4">Explore our marketplace of electronics and tech gadgets.</p>
          <Link to="/marketplace" className="text-blue-600 hover:text-blue-700">
            View Marketplace →
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-blue-900 mb-3">Get TECH Tokens</h3>
          <p className="text-gray-600 mb-4">Use our faucet to get tokens for trading on the platform.</p>
          <Link to="/faucet" className="text-blue-600 hover:text-blue-700">
            Visit Faucet →
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-blue-900 mb-3">Sell Your Items</h3>
          <p className="text-gray-600 mb-4">List your electronics and reach potential buyers.</p>
          <Link to="/sell" className="text-blue-600 hover:text-blue-700">
            Start Selling →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;