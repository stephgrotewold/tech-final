// src/context/Web3Context.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { TOKEN_ADDRESS, TOKEN_ABI } from '../contracts/token';

const Web3Context = createContext();

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [provider, setProvider] = useState(null);

  const initializeProvider = async () => {
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(web3Provider);
      return web3Provider;
    }
    return null;
  };

  const initializeContract = async (userAddress, web3Provider) => {
    try {
      const signer = web3Provider.getSigner();
      const tokenContract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);
      setContract(tokenContract);
      
      const balance = await tokenContract.balanceOf(userAddress);
      setBalance(ethers.utils.formatUnits(balance, 18));
    } catch (error) {
      console.error("Error initializing contract:", error);
      throw error;
    }
  };

  const connectWallet = async () => {
    if (isConnecting) {
      console.log('Connection already in progress');
      return false;
    }

    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return false;
    }

    try {
      setIsConnecting(true);
      setLoading(true);

      const web3Provider = await initializeProvider();
      if (!web3Provider) {
        throw new Error('Failed to initialize provider');
      }

      // Primero verifica cuentas existentes
      const accounts = await web3Provider.listAccounts();
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        await initializeContract(accounts[0], web3Provider);
        return true;
      }

      // Si no hay cuentas, solicita conexión
      try {
        const newAccounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });

        if (newAccounts.length > 0) {
          setAccount(newAccounts[0]);
          await initializeContract(newAccounts[0], web3Provider);
          return true;
        }
      } catch (error) {
        if (error.code === -32002) {
          alert('Please open MetaMask and accept the connection request');
        } else {
          console.error('Error connecting wallet:', error);
          alert('Error connecting wallet. Please try again.');
        }
        return false;
      }

    } catch (error) {
      console.error('Error in connectWallet:', error);
      return false;
    } finally {
      setIsConnecting(false);
      setLoading(false);
    }
  };

  const updateBalance = async (address) => {
    if (contract && address) {
      try {
        const balance = await contract.balanceOf(address);
        setBalance(ethers.utils.formatUnits(balance, 18));
      } catch (error) {
        console.error("Error updating balance:", error);
      }
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setContract(null);
    setBalance(0);
    setIsConnecting(false);
    setProvider(null);
  };

  useEffect(() => {
    const handleAccountsChanged = async (accounts) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        const web3Provider = await initializeProvider();
        setAccount(accounts[0]);
        if (web3Provider) {
          await initializeContract(accounts[0], web3Provider);
        }
      }
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    const handleDisconnect = () => {
      disconnectWallet();
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      window.ethereum.on('disconnect', handleDisconnect);

      // Auto-connect if previously connected
      const checkConnection = async () => {
        try {
          const web3Provider = await initializeProvider();
          if (web3Provider) {
            const accounts = await web3Provider.listAccounts();
            if (accounts.length > 0) {
              setAccount(accounts[0]);
              await initializeContract(accounts[0], web3Provider);
            }
          }
        } catch (error) {
          console.error("Error checking connection:", error);
        }
      };

      checkConnection();
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
        window.ethereum.removeListener('disconnect', handleDisconnect);
      }
    };
  }, []);

  return (
    <Web3Context.Provider value={{
      account,
      contract,
      balance,
      loading,
      provider,
      connectWallet,
      disconnectWallet,
      updateBalance
    }}>
      {children}
    </Web3Context.Provider>
  );
};