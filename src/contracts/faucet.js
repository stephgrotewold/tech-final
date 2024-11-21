/*
// src/contracts/faucet.js
export const FAUCET_ADDRESS = "0x668a659CC12a80925bEeC70729970B04Dc1a040F";
export const FAUCET_ABI = [
  // ... otros métodos del ABI
  {
    "inputs": [],
    "name": "requestTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
*/

import { ethers } from "ethers";

export const FAUCET_ADDRESS = "0x668a659CC12a80925bEeC70729970B04Dc1a040F";
export const FAUCET_ABI = [
  {
    inputs: [],
    name: "requestTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// Instanciar el contrato Faucet
export const getFaucetContract = (provider) => {
  if (!provider) throw new Error("Provider is required to get the Faucet contract.");
  return new ethers.Contract(FAUCET_ADDRESS, FAUCET_ABI, provider.getSigner());
};

// Llamar a requestTokens
export const requestTokens = async (provider) => {
  try {
    const faucet = getFaucetContract(provider);
    const tx = await faucet.requestTokens();
    console.log("Transaction sent:", tx.hash);
    await tx.wait(); // Esperar confirmación
    console.log("Tokens successfully requested!");
    return tx;
  } catch (error) {
    console.error("Error requesting tokens:", error);
    throw new Error("Failed to request tokens.");
  }
};
