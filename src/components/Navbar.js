import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold">
            Techno
          </Link>
          <div className="flex space-x-4">
            <Link to="/marketplace" className="hover:text-blue-200">
              Marketplace
            </Link>
            <Link to="/faucet" className="hover:text-blue-200">
              Get Tokens
            </Link>
            <Link to="/sell" className="hover:text-blue-200">
              Sell Items
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;