// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { ethers } from 'ethers';

function Profile() {
  const { account, balance, contract, connectWallet, disconnectWallet } = useWeb3();
  const [totalSales, setTotalSales] = useState('0');
  const [activeTab, setActiveTab] = useState('purchases');
  const [transactions, setTransactions] = useState({
    purchases: [],
    sales: []
  });

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      if (contract && account) {
        try {
          // Obtener el total de ventas
          const sales = await contract.getSellerTotalSales(account);
          setTotalSales(ethers.utils.formatUnits(sales, 18));

          // Obtener historial de compras
          const purchaseHistory = await contract.getBuyerHistory(account);
          
          // Obtener historial de ventas
          const salesHistory = await contract.getSellerHistory(account);

          setTransactions({
            purchases: purchaseHistory.map(tx => ({
              id: tx.id.toString(),
              type: 'Purchase',
              itemName: tx.itemName,
              price: ethers.utils.formatUnits(tx.price, 18),
              date: new Date(tx.timestamp * 1000).toLocaleDateString(),
              status: 'Completed'
            })),
            sales: salesHistory.map(tx => ({
              id: tx.id.toString(),
              type: 'Sale',
              itemName: tx.itemName,
              price: ethers.utils.formatUnits(tx.price, 18),
              date: new Date(tx.timestamp * 1000).toLocaleDateString(),
              status: 'Completed'
            }))
          });
        } catch (error) {
          console.error('Error fetching transaction history:', error);
        }
      }
    };

    fetchTransactionHistory();
  }, [contract, account]);

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

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
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
              <p className="text-gray-600">
                <span className="font-medium">Total Sales: </span>
                <span>{totalSales} TECH</span>
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

            {/* Transaction List */}
            <div className="mt-6">
              <div className="border rounded-lg divide-y">
                {transactions[activeTab].map((tx) => (
                  <div key={tx.id} className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-800">{tx.itemName}</p>
                      <p className="text-sm text-gray-500">{tx.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-800">{tx.price} TECH</p>
                      <p className="text-sm text-green-600">{tx.status}</p>
                    </div>
                  </div>
                ))}
                {transactions[activeTab].length === 0 && (
                  <div className="p-4 text-center text-gray-500">
                    No {activeTab} found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;