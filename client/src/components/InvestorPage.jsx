// import React, { useContext, useState } from 'react';
// import { InsuranceContext } from '../InsuranceContext.jsx';

// const InvestorPage = () => {
//   const { registerAsInvestor, addBalanceAsInvestor, withdrawAsInvestor, approveClaim } = useContext(InsuranceContext);
//   const [investmentAmount, setInvestmentAmount] = useState('');
//   const [claimGroup, setClaimGroup] = useState('');
//   const [claimIndex, setClaimIndex] = useState('');

//   const handleRegister = async () => {
//     console.log(investmentAmount);
//     await registerAsInvestor(investmentAmount);
//   };

//   const handleAddBalance = async () => {
//     await addBalanceAsInvestor(investmentAmount);
//   };

//   const handleWithdraw = async () => {
//     await withdrawAsInvestor(investmentAmount);
//   };

//   const handleApproveClaim = async () => {
//     await approveClaim(claimGroup, claimIndex);
//   };

//   return (
//     <div className="container">
//       <h1>Investor Operations</h1>
//       <div className="form-group">
//         <label>Investment Amount (ETH):</label>
//         <input
//           type="number"
//           value={investmentAmount}
//           placeholder='Minimum 0.1ETH to register'
//           onChange={(e) => setInvestmentAmount(e.target.value)}
//         />
//         <button onClick={handleRegister}>Register as Investor</button>
//         <button onClick={handleAddBalance}>Add Balance</button>
//         <button onClick={handleWithdraw}>Withdraw</button>
//       </div>
//       <div className="form-group">
//         <label>Group Index:</label>
//         <input
//           type="number"
//           value={claimGroup}
//           onChange={(e) => setClaimGroup(e.target.value)}
//         />
//         <label>Claim Index:</label>
//         <input
//           type="number"
//           value={claimIndex}
//           onChange={(e) => setClaimIndex(e.target.value)}
//         />
//         <button onClick={handleApproveClaim}>Approve Claim</button>
//       </div>
//     </div>
//   );
// };

// export default InvestorPage;
import React, { useContext, useState } from 'react';
import { InsuranceContext } from '../InsuranceContext.jsx';

const InvestorPage = () => {
  const { 
    registerAsInvestor, 
    addBalanceAsInvestor, 
    withdrawAsInvestor, 
    approveClaim, 
    getInvestorBalance 
  } = useContext(InsuranceContext);

  const [investmentAmount, setInvestmentAmount] = useState('');
  const [claimGroup, setClaimGroup] = useState('');
  const [claimIndex, setClaimIndex] = useState('');

  const handleRegister = async () => {
    console.log(investmentAmount);
    await registerAsInvestor(investmentAmount);
  };

  const handleAddBalance = async () => {
    await addBalanceAsInvestor(investmentAmount);
  };

  const handleWithdraw = async () => {
    const balance = await getInvestorBalance();
    
    if (parseFloat(investmentAmount) > parseFloat(balance)) {
      alert("Insufficient balance to withdraw the requested amount.");
    } else {
      await withdrawAsInvestor(investmentAmount);
    }
  };

  const handleApproveClaim = async () => {
    const balance = await getInvestorBalance();

    if (parseFloat(balance) > 0) {
      await approveClaim(claimGroup, claimIndex);
    } else {
      alert("You need to be an investor to approve a claim.");
    }
  };

  return (
    <div className="container">
      <h1>Investor Operations</h1>
      <div className="form-group">
        <label>Investment Amount (ETH):</label>
        <input
          type="number"
          value={investmentAmount}
          placeholder='Minimum 0.1ETH to register'
          onChange={(e) => setInvestmentAmount(e.target.value)}
        />
        <button onClick={handleRegister}>Register as Investor</button>
        <button onClick={handleAddBalance}>Add Balance</button>
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>
      <div className="form-group">
        <label>Group Index:</label>
        <input
          type="number"
          value={claimGroup}
          onChange={(e) => setClaimGroup(e.target.value)}
        />
        <label>Claim Index:</label>
        <input
          type="number"
          value={claimIndex}
          onChange={(e) => setClaimIndex(e.target.value)}
        />
        <button onClick={handleApproveClaim}>Approve Claim</button>
      </div>
    </div>
  );
};

export default InvestorPage;
