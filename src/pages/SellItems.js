// src/pages/SellItems.js
import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { ethers } from 'ethers';

function SellItems() {
  const { account, contract, connectWallet } = useWeb3();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'Computers'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!account) {
      try {
        await connectWallet();
      } catch (error) {
        console.error('Connection error:', error);
        return;
      }
    }

    setLoading(true);
    try {
      console.log('Listing item with data:', formData);

      // Convertir el precio a wei (18 decimales)
      const priceInWei = ethers.utils.parseUnits(formData.price.toString(), 18);

      // Llamar al contrato para listar el item
      const tx = await contract.marketplace.listItem(
        formData.name,
        formData.description,
        priceInWei,
        formData.category,
        formData.image
      );

      console.log('Transaction sent:', tx.hash);
      await tx.wait();
      console.log('Item listed successfully');

      // Limpiar el formulario
      setFormData({
        name: '',
        description: '',
        price: '',
        image: '',
        category: 'Computers'
      });

      alert('Item listed successfully!');
    } catch (error) {
      console.error('Error listing item:', error);
      alert('Error listing item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!account) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h1 className="text-2xl font-bold text-blue-900 mb-6">
            List Your Items
          </h1>
          <p className="text-gray-600 mb-6">
            Please connect your wallet to start selling
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
        <h1 className="text-2xl font-bold text-blue-900 mb-6">
          List Your Electronics for Sale
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (TECH Tokens)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.000000000000000001"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Computers">Computers</option>
              <option value="Phones">Phones</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-lg text-white transition-colors ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Listing...' : 'List Item'}
            </button>
          </div>
        </form>

        {/* Preview section */}
        {(formData.name || formData.description || formData.price) && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Preview</h2>
            <div className="border border-gray-200 rounded-lg p-4">
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-lg font-semibold">{formData.name}</h3>
              <p className="text-gray-600 mt-2">{formData.description}</p>
              {formData.price && (
                <p className="text-blue-600 font-bold mt-2">
                  {formData.price} TECH
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SellItems;