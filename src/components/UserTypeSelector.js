// src/components/UserTypeSelector.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useWeb3 } from '../context/Web3Context';

function UserTypeSelector() {
  const navigate = useNavigate();
  const { setUserType } = useUser();
  const { account } = useWeb3();

  // Redirigir si no hay wallet conectada
  React.useEffect(() => {
    if (!account) {
      navigate('/');
    }
  }, [account, navigate]);

  const handleSelection = (type) => {
    setUserType(type);
    // Redirigir según el tipo de usuario
    if (type === 'seller') {
      navigate('/sell');
    } else {
      navigate('/marketplace');
    }
  };

  if (!account) {
    return null; // No mostrar nada si no hay wallet conectada
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Select Your Profile Type
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Choose how you want to interact with our marketplace
        </p>
        <div className="space-y-4">
          <button
            onClick={() => handleSelection('buyer')}
            className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            <span>Continue as Buyer</span>
          </button>
          <button
            onClick={() => handleSelection('seller')}
            className="w-full p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" 
              />
            </svg>
            <span>Continue as Seller</span>
          </button>
        </div>
        <p className="text-sm text-gray-500 text-center mt-6">
          You can change your profile type at any time
        </p>
      </div>
    </div>
  );
}

export default UserTypeSelector;