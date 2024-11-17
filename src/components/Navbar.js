import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "text-blue-300" : "text-white hover:text-blue-200";
  };

  return (
    <nav className="bg-blue-900 shadow-lg border-b border-blue-800">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-white">
            Techno
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/marketplace" className={isActive("/marketplace")}>
              Marketplace
            </Link>
            <Link to="/faucet" className={isActive("/faucet")}>
              Get Tokens
            </Link>
            <Link to="/sell" className={isActive("/sell")}>
              Sell Items
            </Link>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;