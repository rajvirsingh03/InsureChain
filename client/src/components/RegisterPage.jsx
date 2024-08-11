// import React, { useContext, useState } from 'react';
// import { InsuranceContext } from '../InsuranceContext.jsx';

// const RegisterPage = () => {
//   const { registerForGroup, payPremium, getGroupBalance, GroupCount } = useContext(InsuranceContext);
//   const [groupIndex, setGroupIndex] = useState('');
//   const [premiumAmount, setPremiumAmount] = useState('');
//   const [groupBalance, setGroupBalance] = useState('0');
//   const [userCount, setUserCount] = useState(0);

//   const handleRegister = async () => {
//     await registerForGroup(groupIndex);
//     updateGroupDetails();
//   };

//   const handlePayPremium = async () => {
//     await payPremium(groupIndex);
//     updateGroupDetails();
//   };

//   const updateGroupDetails = async () => {
//     const balance = await getGroupBalance(groupIndex);
//     setGroupBalance(balance);
//     const count = await GroupCount();
//     setUserCount(count);
//   };

//   return (
//     <div className="container">
//       <h1>Register for Insurance Group</h1>
//       <div className="form-group">
//         <label>Group Index:</label>
//         <input
//           type="number"
//           value={groupIndex}
//           placeholder='Index=0,1,...'
//           onChange={(e) => setGroupIndex(e.target.value)}
//         />
//         <button onClick={handleRegister}>Register</button>
//       </div>
//       <div className="form-group">
//         <label>Enter Group Index value to pay Premium Amount (ETH):</label>
//         <input
//           type="number"
//           value={premiumAmount}
//           placeholder='Premium = 0.001ETH'
//           onChange={(e) => setPremiumAmount(e.target.value)}
//         />
//         <button onClick={handlePayPremium}>Pay Premium</button>
//       </div>
//       <div className="form-group">
//         <h2>Group Details</h2>
//         <p>Number of Users: {userCount}</p>
//         <p>Group Balance (ETH): {groupBalance}</p>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;

// import React, { useContext, useState, useEffect } from 'react';
// import { InsuranceContext } from '../InsuranceContext.jsx';

// const RegisterPage = () => {
//   const { registerForGroup, payPremium, getGroupBalance, GroupCount } = useContext(InsuranceContext);
//   const [groupIndex, setGroupIndex] = useState('');
//   const [premiumAmount, setPremiumAmount] = useState('');
//   const [groupBalance, setGroupBalance] = useState('0');
//   const [userCount, setUserCount] = useState(0);
//   const [totalGroups, setTotalGroups] = useState(0); // State for total groups

//   const handleRegister = async () => {
//     await registerForGroup(groupIndex);
//     updateGroupDetails();
//   };

//   const handlePayPremium = async () => {
//     await payPremium(groupIndex);
//     updateGroupDetails();
//   };

//   const updateGroupDetails = async () => {
//     const balance = await getGroupBalance(groupIndex);
//     setGroupBalance(balance);
//     const count = await GroupCount();
//     setUserCount(count);
//   };

//   return (
//     <div className="container">
//       <h1>Register for Insurance Group</h1>
//       <div className="form-group">
//         <label>Group Index:</label>
//         <input
//           type="number"
//           value={groupIndex}
//           placeholder='Index=0,1,...'
//           onChange={(e) => setGroupIndex(e.target.value)}
//         />
//         <button onClick={handleRegister}>Register</button>
//       </div>
//       <div className="form-group">
//         <label>Enter Group Index value to pay Premium Amount (ETH):</label>
//         <input
//           type="number"
//           value={premiumAmount}
//           placeholder='Premium = 0.001ETH'
//           onChange={(e) => setPremiumAmount(e.target.value)}
//         />
//         <button onClick={handlePayPremium}>Pay Premium</button>
//       </div>
//       <div className="form-group">
//         <h2>Group Details</h2>
//         <p>Number of Users: {userCount}</p>
//         <p>Group Balance (ETH): {groupBalance}</p>
//         <p>Total Groups: {GroupCount}</p> {/* Displaying total groups */}
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;

// import React, { useContext, useState, useEffect } from 'react';
// import { InsuranceContext } from '../InsuranceContext.jsx';

// const RegisterPage = () => {
//   const { registerForGroup, payPremium, getGroupBalance, GroupCount } = useContext(InsuranceContext);
//   const [groupIndex, setGroupIndex] = useState('');
//   const [premiumAmount, setPremiumAmount] = useState('');
//   const [groupBalance, setGroupBalance] = useState('0');
//   const [userCount, setUserCount] = useState(0);
//   const [totalGroups, setTotalGroups] = useState(0);

//   // useEffect(() => {
//   //   // Fetch the total number of groups when the component mounts
//   //   const fetchTotalGroups = async () => {
//   //     const count = await GroupCount();
//   //     setTotalGroups(GroupCount);
//   //   };

//   //   fetchTotalGroups();
//   // }, [GroupCount]);

//   const handleRegister = async () => {
//     await registerForGroup(groupIndex);
//     updateGroupDetails();
//   };

//   const handlePayPremium = async () => {
//     await payPremium(groupIndex, premiumAmount);
//     updateGroupDetails();
//   };

//   const updateGroupDetails = async () => {
//     try {
//       const balance = await getGroupBalance(groupIndex);
//       setGroupBalance(balance.toString()); // Ensure balance is stored as a string
//       console.log("Group Balance:", balance);
      
//       const count = await GroupCount(groupIndex); // Assuming GroupCount returns the number of users in a specific group
//       setUserCount(count.toNumber()); // Convert BigNumber to a regular number
//     } catch (error) {
//       console.error("Error updating group details:", error);
//     }

//   };

//   return (
//     <div className="container">
//       <h1>Register for Insurance Group</h1>
//       <div className="form-group">
//         <label>Group Index:</label>
//         <input
//           type="number"
//           value={groupIndex}
//           placeholder='Index=0,1,...'
//           onChange={(e) => setGroupIndex(e.target.value)}
//         />
//         <button onClick={handleRegister}>Register</button>
//       </div>
//       <div className="form-group">
//         <label>Enter Group Index value to pay Premium Amount (ETH):</label>
//         <input
//           type="number"
//           value={premiumAmount}
//           placeholder='Premium = 0.001ETH'
//           onChange={(e) => setPremiumAmount(e.target.value)}
//         />
//         <button onClick={handlePayPremium}>Pay Premium</button>
//       </div>
//       <div className="form-group">
//         <h2>Group Details</h2>
//         <p>Number of Users: {userCount}</p>
//         <p>Group Balance (ETH): {getGroupBalance}</p>
//         <p>Total Groups: {GroupCount}</p> {/* Displaying total groups */}
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;
import React, { useContext, useState, useEffect } from 'react';
import { InsuranceContext } from '../InsuranceContext.jsx';

const RegisterPage = () => {
    const { registerForGroup, payPremium, getGroupBalance, numUsersInGroup, GroupCount } = useContext(InsuranceContext);
    const [groupIndex, setGroupIndex] = useState('');
    const [premiumAmount, setPremiumAmount] = useState('');
    const [groupBalance, setGroupBalance] = useState('0');
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        // Fetch and log the total number of groups when the component mounts
        console.log('Total number of groups:', GroupCount);
    }, [GroupCount]);

    useEffect(() => {
        if (groupIndex !== '') {
            updateGroupDetails();
        }
    }, [groupIndex]);

    const handleRegister = async () => {
        if (groupIndex === '') {
            alert('Please enter a valid group index.');
            return;
        }
        await registerForGroup(groupIndex);
        updateGroupDetails();
    };

    const handlePayPremium = async () => {
        if (groupIndex === '') {
            alert('Please enter a valid group index.');
            return;
        }
        await payPremium(groupIndex);
        updateGroupDetails();
    };

    const updateGroupDetails = async () => {
        try {
            // Fetch balance
            const balance = await getGroupBalance(groupIndex);
            console.log("Fetched Group Balance:", balance);
            setGroupBalance(balance.toString()); // Convert BigInt to string

            // Fetch number of users
            const count = await numUsersInGroup(groupIndex);
            console.log("Fetched Number of Users in Group:", count);
            setUserCount(Number(count)); // Convert BigInt to a number

        } catch (error) {
            console.error("Error updating group details:", error);
        }
    };

    return (
        <div className="container">
            <h1>Register for Insurance Group</h1>
            <div className="form-group">
                <label>Group Index:</label>
                <input
                    type="number"
                    value={groupIndex}
                    placeholder='Index=0,1,...'
                    onChange={(e) => setGroupIndex(e.target.value)}
                />
                <button onClick={handleRegister}>Register</button>
            </div>
            <div className="form-group">
                <label>Enter Premium Amount (ETH):</label>
                <input
                    type="number"
                    value={premiumAmount}
                    placeholder='Premium = 0.001 ETH'
                    onChange={(e) => setPremiumAmount(e.target.value)}
                />
                <button onClick={handlePayPremium}>Pay Premium</button>
            </div>
            <div className="form-group">
                <h2>Group Details</h2>
                {/* <p>Number of Users: {userCount}</p>
                <p>Group Balance (ETH): {groupBalance}</p> */}
                <p>Total Groups: {GroupCount}</p>
            </div>
        </div>
    );
};

export default RegisterPage;




