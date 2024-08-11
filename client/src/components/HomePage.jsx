import React, { useContext, useState, useEffect } from 'react';
import { InsuranceContext } from '../InsuranceContext.jsx';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { createInsuranceGroup, GroupCount } = useContext(InsuranceContext);
  const [newGroupBalance, setNewGroupBalance] = useState('');
  const [account, setAccount] = useState('');

  useEffect(() => {
    // Fetch and log the total number of groups when the component mounts
    console.log('Total number of groups:', GroupCount);
  }, [GroupCount]);

  useEffect(() => {
    const loadAccount = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } else {
        console.error('Ethereum provider not found');
      }
    };

    loadAccount();
  }, []);

  const handleCreateGroup = async () => {
    await createInsuranceGroup(newGroupBalance);
  };

  const getShortAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="container">
      <header className="header">
        <div className="links">
          <Link to="/register">Register/Pay Premium</Link>
          <Link to="/investor">Investor</Link>
          <Link to="/claim">Claims</Link>
        </div>
        <div className="metamask-connection">
          <p>Connected Account: {getShortAddress(account)}</p>
        </div>
      </header>
      <main className="main-content">
        <h1>Insurance Groups</h1>
        <p>Total Insurance Groups: {GroupCount}</p>
        <div className="form-group">
          <label>Initial Balance for New Group (ETH):</label>
          <input
            type="number"
            value={newGroupBalance}
            placeholder="Minimum 0.01ETH"
            onChange={(e) => setNewGroupBalance(e.target.value)}
          />
          <button onClick={handleCreateGroup}>Create Group</button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
