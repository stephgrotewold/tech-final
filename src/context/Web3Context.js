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

  const connectWallet = async () => {
    try {
      setLoading(true);
      if (window.ethereum) {
        // Limpiar el estado anterior si existe
        if (account) {
          await disconnectWallet();
        }

        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const tokenContract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);
        
        setAccount(accounts[0]);
        setContract(tokenContract);
        
        const balance = await tokenContract.balanceOf(accounts[0]);
        setBalance(ethers.utils.formatUnits(balance, 18));

        // Cambiar a Sepolia si no está en esa red
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xaa36a7' }], // Sepolia chainId
          });
        } catch (error) {
          console.error("Error switching network:", error);
        }
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      // Limpiar el estado
      setAccount(null);
      setContract(null);
      setBalance(0);

      // Remover los listeners de eventos
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }

      // Reinicializar los listeners después de la desconexión
      initializeEthereumListeners();
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  const initializeEthereumListeners = () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setAccount(accounts[0]);
          updateBalance(accounts[0]);
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });

      window.ethereum.on('disconnect', () => {
        disconnectWallet();
      });
    }
  };

  const updateBalance = async (address) => {
    if (contract && address) {
      const balance = await contract.balanceOf(address);
      setBalance(ethers.utils.formatUnits(balance, 18));
    }
  };

  useEffect(() => {
    initializeEthereumListeners();
    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners();
      }
    };
  }, []);

  return (
    <Web3Context.Provider value={{
      account,
      contract,
      balance,
      loading,
      connectWallet,
      disconnectWallet,
      updateBalance
    }}>
      {children}
    </Web3Context.Provider>
  );
};