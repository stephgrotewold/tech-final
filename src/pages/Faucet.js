import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';

function Faucet() {
  const { account } = useWeb3();
  const [amount, setAmount] = useState('10');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleRequestTokens = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Aquí irá la lógica de interacción con el smart contract
      // Por ahora simulamos la transacción
      await new Promise(resolve => setTimeout(resolve, 2000));
      setMessage({
        type: 'success',
        text: `Successfully sent ${amount} TECH tokens to your wallet!`
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to send tokens. Please try again.'
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
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Connect Wallet
            </button>
          </div>
        ) : (
          <form onSubmit={handleRequestTokens} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount of TECH Tokens
              </label>
              <div className="flex items-center space-x-4">
                <select
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="10">10 TECH</option>
                  <option value="20">20 TECH</option>
                  <option value="50">50 TECH</option>
                  <option value="100">100 TECH</option>
                </select>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-2 rounded-lg text-white transition-colors ${
                    loading
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {loading ? 'Requesting...' : 'Request Tokens'}
                </button>
              </div>
            </div>

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
                <li>Select the amount of TECH tokens you want</li>
                <li>Click "Request Tokens" to receive them</li>
                <li>Tokens will be sent to your connected wallet</li>
                <li>You can request tokens once every 24 hours</li>
              </ul>
            </div>
          </form>
        )}
      </div>

      {/* Transaction History */}
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
            {/* Add more transaction history items here */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Faucet;