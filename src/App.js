// src/App.js
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Web3Provider } from './context/Web3Context';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Faucet from './pages/Faucet';
import SellItems from './pages/SellItems';
import Profile from './pages/Profile';
import UserTypeSelector from './components/UserTypeSelector';
import { useWeb3 } from './context/Web3Context';
import { useUser } from './context/UserContext';

// Componente para rutas que requieren wallet conectada
const ProtectedRoute = ({ children }) => {
  const { account } = useWeb3();
  if (!account) {
    return <Navigate to="/" />;
  }
  return children;
};

// Componente para rutas que requieren ser seller
const SellerRoute = ({ children }) => {
  const { account } = useWeb3();
  const { userType } = useUser();
  
  if (!account) {
    return <Navigate to="/" />;
  }
  
  if (userType !== 'seller') {
    return <Navigate to="/marketplace" />;
  }
  
  return children;
};

function AppContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route 
            path="/profile-select" 
            element={
              <ProtectedRoute>
                <UserTypeSelector />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/faucet" 
            element={
              <ProtectedRoute>
                <Faucet />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/sell" 
            element={
              <SellerRoute>
                <SellItems />
              </SellerRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Web3Provider>
      <Router basename="/"> {/* Cambiado el basename a "/" */}
        <UserProvider>
          <AppContent />
        </UserProvider>
      </Router>
    </Web3Provider>
  );
}

export default App;