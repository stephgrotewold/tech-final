import React, { createContext, useContext, useState, useEffect } from 'react';
import Web3 from 'web3';

const Web3Context = createContext(null);

export function Web3Provider({ children }) {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [loading, setLoading] = useState(true);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3Instance.eth.getAccounts();
        setWeb3(web3Instance);
        setAccount(accounts[0]);
        return true;
      } else {
        alert('Please install MetaMask!');
        return false;
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      return false;
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        const accounts = await web3Instance.eth.getAccounts();
        if (accounts.length > 0) {
          setWeb3(web3Instance);
          setAccount(accounts[0]);
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const value = {
    account,
    web3,
    loading,
    connectWallet
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}