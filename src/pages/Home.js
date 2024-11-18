// src/pages/Home.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';

function Home() {
  const navigate = useNavigate();
  const { account, connectWallet } = useWeb3();

  const handleConnectWallet = async () => {
    try {
      const success = await connectWallet();
      if (success) {
        navigate('/profile-select');
      }
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  const handleStartSelling = async () => {
    if (!account) {
      try {
        const success = await connectWallet();
        if (success) {
          navigate('/profile-select');
        }
      } catch (error) {
        console.error('Connection error:', error);
      }
    } else {
      navigate('/sell');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
        <h1 className="text-3xl font-bold text-[#1e3a8a] mb-4">
          Welcome to our Electronics Marketplace
        </h1>
        <p className="text-gray-600 mb-8">
          {!account 
            ? "Connect your wallet to start buying and selling electronics."
            : "Start exploring our marketplace or list your items for sale."}
        </p>
        <div className="flex space-x-4">
          {!account ? (
            <button 
              onClick={handleConnectWallet}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>Connect Wallet</span>
            </button>
          ) : (
            <Link
              to="/marketplace"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Marketplace
            </Link>
          )}
          <Link
            to="/faucet"
            className="bg-blue-100 text-blue-900 px-6 py-3 rounded-lg hover:bg-blue-200 transition-colors"
          >
            Get TECH Tokens
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-[#1e3a8a] mb-3">Browse Products</h3>
          <p className="text-gray-600 mb-4">Explore our marketplace of electronics</p>
          <Link 
            to="/marketplace" 
            className="text-blue-600 hover:text-blue-700 flex items-center"
          >
            View Marketplace 
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-[#1e3a8a] mb-3">Get TECH Tokens</h3>
          <p className="text-gray-600 mb-4">Use our faucet to get tokens for trading</p>
          <Link 
            to="/faucet" 
            className="text-blue-600 hover:text-blue-700 flex items-center"
          >
            Visit Faucet
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-[#1e3a8a] mb-3">Sell Your Items</h3>
          <p className="text-gray-600 mb-4">List your electronics for sale</p>
          <button
            onClick={handleStartSelling}
            className="text-blue-600 hover:text-blue-700 flex items-center"
          >
            Start Selling
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;