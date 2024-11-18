import React from 'react';
import { useWeb3 } from '../context/Web3Context';

function WalletConnect() {
  const { account, balance, loading, connectWallet, disconnectWallet } = useWeb3();

  return (
    <div className="flex items-center space-x-4">
      {!account ? (
        <button
          onClick={connectWallet}
          disabled={loading}
          className={`bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div className="flex items-center space-x-4">
          <span className="text-gray-200">
            {account.slice(0, 6)}...{account.slice(-4)}
          </span>
          <span className="text-gray-200">
            {balance} TECH
          </span>
          <button
            onClick={disconnectWallet}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}

export default WalletConnect;