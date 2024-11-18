// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Web3Provider } from './context/Web3Context';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Faucet from './pages/Faucet';
import SellItems from './pages/SellItems';
import Products from './pages/Products';
import Profile from './pages/Profile';

// Import CSS
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800">
      <Web3Provider>
        <Router>
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/faucet" element={<Faucet />} />
              <Route path="/sell" element={<SellItems />} />
              <Route path="/products" element={<Products />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </Router>
      </Web3Provider>
    </div>
  );
}

export default App;