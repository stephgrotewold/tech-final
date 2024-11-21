// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { useUser } from '../context/UserContext';
import { ethers } from 'ethers';

function Profile() {
  const { account, balance, contract, disconnectWallet } = useWeb3();
  const { userType } = useUser();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('purchases');
  const [purchases, setPurchases] = useState([]);
  const [sales, setSales] = useState([]);
  const [error, setError] = useState(null);

  const calculateTotalSales = (salesArray) => {
    return salesArray
      .filter(item => !item.isActive)
      .reduce((total, item) => total + parseFloat(item.price), 0)
      .toFixed(2);
  };

  const loadPurchases = async () => {
    if (!contract.marketplace || !account) return;
    
    try {
      console.log('Loading purchases for account:', account);
      const items = await contract.marketplace.getBuyerPurchases(account);
      console.log('Raw purchases:', items);

      const formattedPurchases = items
        .filter(item => item.id.toString() !== '0')
        .map(item => ({
          id: item.id.toString(),
          name: item.name,
          description: item.description,
          price: ethers.utils.formatUnits(item.price, 18),
          seller: item.seller,
          category: item.category,
          imageUrl: item.imageUrl || "https://via.placeholder.com/150",
          isActive: item.isActive
        }));

      console.log('Formatted purchases:', formattedPurchases);
      setPurchases(formattedPurchases);
    } catch (error) {
      console.error("Error loading purchases:", error);
      setError("Failed to load purchases. Please try again later.");
    }
  };

  const loadSales = async () => {
    if (!contract.marketplace || !account) return;
    
    try {
      console.log('Loading sales for account:', account);
      const items = await contract.marketplace.getSellerItems(account);
      console.log('Raw sales:', items);

      const formattedSales = items
        .filter(item => item.id.toString() !== '0')
        .map(item => ({
          id: item.id.toString(),
          name: item.name,
          description: item.description,
          price: ethers.utils.formatUnits(item.price, 18),
          buyer: item.buyer,
          category: item.category,
          imageUrl: item.imageUrl || "https://via.placeholder.com/150",
          isActive: item.isActive
        }));

      console.log('Formatted sales:', formattedSales);
      setSales(formattedSales);
    } catch (error) {
      console.error("Error loading sales:", error);
      setError("Failed to load sales. Please try again later.");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        await Promise.all([loadPurchases(), loadSales()]);
      } catch (error) {
        console.error("Error loading data:", error);
        setError("Failed to load profile data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (contract.marketplace && account) {
      loadData();
    }
  }, [contract.marketplace, account]);

  const renderSalesSummary = () => (
    <div className="mt-6 bg-green-50 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-green-800 mb-2">
        Sales Summary
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Total Sales</p>
          <p className="text-2xl font-bold text-green-600">
            {calculateTotalSales(sales)} TECH
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Items Sold</p>
          <p className="text-2xl font-bold text-green-600">
            {sales.filter(item => !item.isActive).length}
          </p>
        </div>
      </div>
    </div>
  );

  const renderTransactionsList = () => (
    <div className="grid grid-cols-1 gap-4">
      {(activeTab === 'purchases' ? purchases : sales).map((item) => (
        <div 
          key={item.id} 
          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start space-x-4">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150";
              }}
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.name}
                </h3>
                <span className="text-blue-600 font-bold">
                  {item.price} TECH
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-1">
                {item.description}
              </p>
              <div className="mt-2 flex justify-between items-center">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {item.category}
                </span>
                <span className={`text-xs px-2 py-1 rounded ${
                  item.isActive 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {item.isActive ? 'Active' : 'Sold'}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {(activeTab === 'purchases' ? purchases : sales).length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            No {activeTab} found
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* Header and Wallet Info */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-900">My Profile</h1>
          <div className="flex items-center space-x-4">
            {userType && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {userType === 'buyer' ? 'Buyer' : 'Seller'}
              </span>
            )}
            <button
              onClick={disconnectWallet}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Disconnect
            </button>
          </div>
        </div>

        {/* Wallet Details */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Wallet Information</h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Address: </span>
              <span className="font-mono">{account}</span>
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Balance: </span>
              <span>{balance} TECH</span>
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('purchases')}
              className={`${
                activeTab === 'purchases'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
            >
              My Purchases
            </button>
            <button
              onClick={() => setActiveTab('sales')}
              className={`${
                activeTab === 'sales'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
            >
              My Sales
            </button>
          </nav>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading {activeTab}...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {activeTab === 'sales' && renderSalesSummary()}
            {renderTransactionsList()}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;