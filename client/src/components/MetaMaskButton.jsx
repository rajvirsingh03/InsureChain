// src/components/MetaMaskButton.jsx

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const MetaMaskButton = () => {
  const [account, setAccount] = useState(null);

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("MetaMask connection error:", error);
      }
    } else {
      console.error("MetaMask is not installed");
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
    <div style={{ position: 'absolute', top: 10, right: 10 }}>
      {account ? (
        <div>Connected: {account.substring(0, 6)}...{account.substring(account.length - 4)}</div>
      ) : (
        <button onClick={connectMetaMask}>Connect MetaMask</button>
      )}
    </div>
  );
};

export default MetaMaskButton;
