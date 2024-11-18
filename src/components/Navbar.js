// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import { useUser } from '../context/UserContext';

function Navbar() {
  const navigate = useNavigate();
  const { account, balance, connectWallet, disconnectWallet } = useWeb3();
  const { userType, setUserType } = useUser();

  const handleConnect = async () => {
    try {
      const success = await connectWallet();
      if (success) {
        navigate('/profile-select');
      }
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setUserType(null);
    navigate('/');
  };

  const handleStartSelling = () => {
    if (!account) {
      handleConnect();
    } else {
      navigate('/sell');
    }
  };

  return (
    <nav className="bg-[#1e3a8a] border-b border-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold text-white">
            Techno
          </Link>
          
          <div className="flex items-center space-x-8">
            {/* Marketplace siempre visible */}
            <Link 
              to="/marketplace" 
              className="text-white hover:text-blue-200 transition-colors"
            >
              Marketplace
            </Link>

            {/* Start Selling - redirige a connect wallet si no está conectado */}
            <button
              onClick={handleStartSelling}
              className="text-white hover:text-blue-200 transition-colors"
            >
              Start Selling
            </button>

            {/* Wallet Connection */}
            {!account ? (
              <button 
                onClick={handleConnect}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
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
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-end">
                  <span className="text-white text-sm font-medium">
                    {account.slice(0, 6)}...{account.slice(-4)}
                  </span>
                  <span className="text-gray-300 text-xs">
                    {balance} TECH
                  </span>
                </div>
                <button
                  onClick={handleDisconnect}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm flex items-center space-x-2"
                >
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                    />
                  </svg>
                  <span>Disconnect</span>
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