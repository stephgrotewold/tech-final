import React, { createContext, useState, useEffect } from 'react';
import Web3 from 'web3';
import { TOKEN_ABI, TOKEN_ADDRESS } from '../contracts/token';

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [token, setToken] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Instance = new Web3(window.ethereum);
        const accounts = await web3Instance.eth.getAccounts();
        const tokenContract = new web3Instance.eth.Contract(TOKEN_ABI, TOKEN_ADDRESS);
        
        setWeb3(web3Instance);
        setAccount(accounts[0]);
        setToken(tokenContract);
      } catch (error) {
        console.error('Error connecting to MetaMask', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0]);
      });
    }
  }, []);

  return (
    <Web3Context.Provider value={{ web3, account, token, connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};