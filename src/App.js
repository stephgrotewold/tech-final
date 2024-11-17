import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-blue-900">
        <Navbar />
        <div className="container mx-auto px-6 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
              Welcome to our Electronics Marketplace
            </h2>
            <p className="text-gray-600 mb-6">
              Connect your wallet to start buying and selling electronics.
            </p>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;