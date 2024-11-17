import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
        <h1 className="text-3xl font-bold text-[#1e3a8a] mb-4">
          Welcome to our Electronics Marketplace
        </h1>
        <p className="text-gray-600 mb-8">
          Connect your wallet to start buying and selling electronics.
        </p>
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Connect Wallet
          </button>
          <Link
            to="/faucet"
            className="bg-blue-100 text-blue-900 px-6 py-3 rounded-lg hover:bg-blue-200 transition-colors"
          >
            Get TECH Tokens
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-[#1e3a8a] mb-3">Browse Products</h3>
          <p className="text-gray-600 mb-4">Explore our marketplace of electronics</p>
          <Link to="/marketplace" className="text-blue-600 hover:text-blue-700">
            View Marketplace →
          </Link>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-[#1e3a8a] mb-3">Get TECH Tokens</h3>
          <p className="text-gray-600 mb-4">Use our faucet to get tokens for trading</p>
          <Link to="/faucet" className="text-blue-600 hover:text-blue-700">
            Visit Faucet →
          </Link>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-[#1e3a8a] mb-3">Sell Your Items</h3>
          <p className="text-gray-600 mb-4">List your electronics for sale</p>
          <Link to="/sell" className="text-blue-600 hover:text-blue-700">
            Start Selling →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;