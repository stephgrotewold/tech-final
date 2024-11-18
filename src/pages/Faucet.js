// src/pages/Faucet.js
import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';

function Faucet() {
  const { account, balance, contract, updateBalance, connectWallet } = useWeb3();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const requestTokens = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Use the contract to request tokens
      const tx = await contract.requestTokens();
      await tx.wait();

      // Update the balance
      await updateBalance();

      setSuccess('Successfully received tokens!');
    } catch (err) {
      setError(err.message || 'Error requesting tokens');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">Get TECH Tokens</h1>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <p className="text-blue-800">
            Use this faucet to get TECH tokens for testing. These tokens can be used to
            buy items in our marketplace.
          </p>
        </div>

        {!account ? (
          <div className="text-center py-6">
            <p className="text-gray-600 mb-4">Please connect your wallet to request tokens</p>
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
              onClick={requestTokens}
              disabled={loading || !account}
              className={`w-full px-6 py-2 rounded-lg text-white transition-colors ${
                loading || !account
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Processing...' : 'Get Free Tokens'}
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-4 p-4 bg-green-50 text-green-600 rounded-lg">
                {success}
              </div>
            )}

            <div className="mt-6 text-sm text-gray-500">
              <h3 className="font-medium text-gray-700 mb-2">How it works:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Connect your MetaMask wallet</li>
                <li>Click "Get Free Tokens" to receive TECH tokens</li>
                <li>Tokens will be sent to your connected wallet</li>
                <li>You can request tokens once every 24 hours</li>
                <li>Use these tokens to buy items in the marketplace</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Faucet;