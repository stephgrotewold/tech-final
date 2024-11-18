// src/components/Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';

function Navbar() {
  const location = useLocation();
  const { account, balance, connectWallet, disconnectWallet } = useWeb3();

  return (
    <nav className="bg-[#1e3a8a] border-b border-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold text-white">
            Techno
          </Link>
          <div className="flex items-center space-x-8">
            <Link 
              to="/marketplace" 
              className="text-white hover:text-blue-200 transition-colors"
            >
              Marketplace
            </Link>
            <Link 
              to="/faucet" 
              className="text-white hover:text-blue-200 transition-colors"
            >
              Get Tokens
            </Link>
            <Link 
              to="/sell" 
              className="text-white hover:text-blue-200 transition-colors"
            >
              Sell Items
            </Link>
            
            {!account ? (
              <button 
                onClick={connectWallet}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Connect Wallet
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-end">
                  <span className="text-white text-sm">
                    {account.slice(0, 6)}...{account.slice(-4)}
                  </span>
                  <span className="text-gray-300 text-xs">
                    {balance} TECH
                  </span>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;