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
        // Request account access
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        
        // Get the provider and signer
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        
        // Create contract instance
        const tokenContract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);
        
        setAccount(accounts[0]);
        setContract(tokenContract);
        
        // Get initial balance
        const balance = await tokenContract.balanceOf(accounts[0]);
        setBalance(ethers.utils.formatUnits(balance, 18));

        // Switch to Sepolia if not already on it
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

  const disconnectWallet = () => {
    setAccount(null);
    setContract(null);
    setBalance(0);
  };

  const updateBalance = async () => {
    if (contract && account) {
      const balance = await contract.balanceOf(account);
      setBalance(ethers.utils.formatUnits(balance, 18));
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setAccount(accounts[0]);
          updateBalance();
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

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