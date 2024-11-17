import React, { createContext, useState, useContext } from 'react';
import Web3 from 'web3';

const Web3Context = createContext(null);

export function Web3Provider({ children }) {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        const web3Instance = new Web3(window.ethereum);
        setAccount(accounts[0]);
        setWeb3(web3Instance);
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      console.log('Please install MetaMask!');
    }
  };

  return (
    <Web3Context.Provider value={{ account, web3, connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
}