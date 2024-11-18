// src/components/WalletConnect.js
import React from 'react';
import { useWeb3 } from '../context/Web3Context';

function WalletConnect() {
  const { account, balance, connectWallet, disconnectWallet } = useWeb3();

  return (
    <div className="flex items-center gap-4">
      {!account ? (
        <button
          onClick={connectWallet}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-gray-200 text-sm">
              {account.slice(0, 6)}...{account.slice(-4)}
            </span>
            <span className="text-gray-300 text-xs">
              {balance} TECH
            </span>
          </div>
          <button
            onClick={disconnectWallet}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}

export default WalletConnect;