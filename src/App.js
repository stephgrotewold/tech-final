import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Web3Provider } from './context/Web3Context';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Faucet from './pages/Faucet';
import SellItems from './pages/SellItems';

function App() {
  return (
    <Web3Provider>
      <Router>
        <div className="min-h-screen bg-blue-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/faucet" element={<Faucet />} />
            <Route path="/sell" element={<SellItems />} />
          </Routes>
        </div>
      </Router>
    </Web3Provider>
  );
}

export default App;