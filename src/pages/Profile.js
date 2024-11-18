// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';

function Profile() {
  const { account, balance, connectWallet, disconnectWallet } = useWeb3();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Here you could fetch transaction history for the connected account
    // This is a placeholder for demonstration
    if (account) {
      setTransactions([
        {
          type: 'Purchase',
          date: new Date().toLocaleDateString(),
          amount: '50 TECH',
          status: 'Completed'
        },
        {
          type: 'Token Request',
          date: new Date().toLocaleDateString(),
          amount: '100 TECH',
          status: 'Completed'
        }
      ]);
    }
  }, [account]);

  if (!account) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h1 className="text-2xl font-bold text-blue-900 mb-6">
            Profile
          </h1>
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

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-900">
            Profile
          </h1>
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

          {/* Transaction History */}
          <div>
            <h2 className="text-lg font-semibold text-blue-900 mb-4">Transaction History</h2>
            <div className="border rounded-lg divide-y">
              {transactions.map((tx, index) => (
                <div key={index} className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">{tx.type}</p>
                    <p className="text-sm text-gray-500">{tx.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-800">{tx.amount}</p>
                    <p className="text-sm text-green-600">{tx.status}</p>
                  </div>
                </div>
              ))}
              {transactions.length === 0 && (
                <div className="p-4 text-center text-gray-500">
                  No transactions found
                </div>
              )}
            </div>
          </div>

          {/* Additional Profile Settings */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">Settings</h2>
            <p className="text-gray-600 text-sm">
              Connected to Sepolia Test Network
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;