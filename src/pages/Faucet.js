// src/pages/Faucet.js
import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';

function Faucet() {
  const { account, balance, connectWallet, requestTokens } = useWeb3();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleRequestTokens = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await requestTokens();
      setMessage({
        type: 'success',
        text: 'Successfully received 10 TECH tokens!'
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to request tokens. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">
          Get TECH Tokens
        </h1>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <p className="text-blue-800">
            Use this faucet to get TECH tokens for testing. These tokens can be used to buy items in our marketplace.
          </p>
        </div>

        {!account ? (
          <div className="text-center py-6">
            <p className="text-gray-600 mb-4">
              Please connect your wallet to request tokens
            </p>
            <button 
              onClick={connectWallet}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your TECH Token Balance
              </label>
              <p className="text-lg font-medium">{balance} TECH</p>
            </div>

            <button
              onClick={handleRequestTokens}
              disabled={loading}
              className={`w-full px-6 py-2 rounded-lg text-white transition-colors ${
                loading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Requesting...' : 'Get Free Tokens'}
            </button>

            {message && (
              <div
                className={`p-4 rounded-lg ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-800'
                    : 'bg-red-50 text-red-800'
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="mt-6 text-sm text-gray-500">
              <h3 className="font-medium text-gray-700 mb-2">How it works:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Connect your MetaMask wallet</li>
                <li>Click "Get Free Tokens" to receive 10 TECH tokens</li>
                <li>Tokens will be sent to your connected wallet</li>
                <li>You can request tokens once every 24 hours</li>
                <li>Use these tokens to buy items in the marketplace</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {account && (
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            Recent Transactions
          </h2>
          <div className="border rounded-lg divide-y">
            <div className="p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">Received 10 TECH</p>
                <p className="text-sm text-gray-500">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
              <span className="text-green-600">Success</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Faucet;