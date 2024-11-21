import React, { useState } from "react";
import { useWeb3 } from "../context/Web3Context";
import { requestTokens } from "../contracts/faucet";

function Faucet() {
  const { provider, account, connectWallet } = useWeb3();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRequestTokens = async () => {
    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await requestTokens(provider); // Llama al contrato
      setSuccess("Successfully received tokens!");
    } catch (err) {
      console.error("Error requesting tokens:", err);
      setError("Failed to request tokens.");
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
            <button
              onClick={handleRequestTokens}
              disabled={loading}
              className={`w-full px-6 py-2 rounded-lg text-white transition-colors ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Processing..." : "Get Free Tokens"}
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
          </div>
        )}
      </div>
    </div>
  );
}

export default Faucet;
