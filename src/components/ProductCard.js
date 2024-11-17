import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Web3Context } from '../context/Web3Context';

function ProductCard({ product }) {
  const { account } = useContext(Web3Context);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-blue-900 font-bold">
            {product.price} TECH
          </span>
          {account ? (
            <button className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600">
              Buy Now
            </button>
          ) : (
            <span className="text-gray-500">Connect wallet to buy</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;