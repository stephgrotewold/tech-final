// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { ethers } from 'ethers';

function Profile() {
  const { account, balance, contract, connectWallet, disconnectWallet } = useWeb3();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('purchases');
  const [purchases, setPurchases] = useState([]);
  const [sales, setSales] = useState([]);

  const loadPurchases = async () => {
    try {
      if (contract.marketplace && account) {
        console.log('Loading purchases for account:', account);
        const items = await contract.marketplace.getBuyerPurchases(account);
        console.log('Raw purchases:', items);

        const formattedPurchases = items.map(item => ({
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
      }
    } catch (error) {
      console.error("Error loading purchases:", error);
    }
  };

  const loadSales = async () => {
    try {
      if (contract.marketplace && account) {
        console.log('Loading sales for account:', account);
        const items = await contract.marketplace.getSellerItems(account);
        console.log('Raw sales:', items);

        const formattedSales = items.map(item => ({
          id: item.id.toString(),
          name: item.name,
          description: item.description,
          price: ethers.utils.formatUnits(item.price, 18),
          seller: item.seller,
          category: item.category,
          imageUrl: item.imageUrl || "https://via.placeholder.com/150",
          isActive: item.isActive
        }));

        console.log('Formatted sales:', formattedSales);
        setSales(formattedSales);
      }
    } catch (error) {
      console.error("Error loading sales:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([loadPurchases(), loadSales()]);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (contract.marketplace && account) {
      loadData();
    }
  }, [contract.marketplace, account]);

  if (!account) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h1 className="text-2xl font-bold text-blue-900 mb-6">Profile</h1>
          <p className="text-gray-600 mb-6">
            Please connect your wallet to view your profile
          </p>
          <button
            onClick={connectWallet}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  const activeItems = activeTab === 'purchases' ? purchases : sales;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-900">Profile</h1>
          <button
            onClick={disconnectWallet}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Disconnect Wallet
          </button>
        </div>

        <div className="space-y-6">
          {/* Wallet Information */}
          <div className="bg-blue-50 rounded-lg p-4">
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

          {/* Transaction History Tabs */}
          <div>
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('purchases')}
                  className={`${
                    activeTab === 'purchases'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
                >
                  Purchases
                </button>
                <button
                  onClick={() => setActiveTab('sales')}
                  className={`${
                    activeTab === 'sales'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
                >
                  Sales
                </button>
              </nav>
            </div>

            {/* Items List */}
            <div className="mt-6">
              {loading ? (
                <div className="text-center py-4">
                  <p>Loading {activeTab}...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {activeItems.map((item) => (
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
                          {activeTab === 'purchases' && (
                            <p className="text-sm text-gray-500 mt-1">
                              Seller: {item.seller}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {activeItems.length === 0 && (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <p className="text-gray-600">No {activeTab} found</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;