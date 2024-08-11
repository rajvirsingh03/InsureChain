// import React, { createContext, useState, useEffect } from 'react';
// import { ethers } from 'ethers';
// import InsuranceABI from './InsuranceABI.json';

// const InsuranceContext = createContext();

// const InsuranceProvider = ({ children }) => {
//   const [provider, setProvider] = useState(null);
//   const [signer, setSigner] = useState(null);
//   const [contract, setContract] = useState(null);

//   const contractAddress = '0x2712190e10f425FD35756A5b5FC0E3BA1c1021b8';

//   const initProvider = async () => {
//     if (window.ethereum) {
//       const web3Provider = new ethers.BrowserProvider(window.ethereum);
//       setProvider(web3Provider);
//       const web3Signer = await web3Provider.getSigner();
//       setSigner(web3Signer);
//       const insuranceContract = new ethers.Contract(contractAddress, InsuranceABI, web3Signer);
//       setContract(insuranceContract);
//     } else {
//       console.error('Ethereum provider not found');
//     }
//   };

//   useEffect(() => {
//     initProvider();
//   }, []);

//   const addBalanceAsInvestor = async (amount) => {
//     if (contract) {
//       try {
//         const tx = await contract.addBalanceAsInvestor({ value: ethers.parseEther(amount) });
//         await tx.wait();
//       } catch (error) {
//         console.error('Error adding balance:', error);
//       }
//     }
//   };

//   const registerAsInvestor = async (amount) => {
//     if (contract) {
//       try {
//         const tx = await contract.registerAsInvestor({ value: ethers.parseEther(amount) });
//         await tx.wait();
//       } catch (error) {
//         console.error('Error registering as investor:', error);
//       }
//     }
//   };

//   const withdrawAsInvestor = async (amount) => {
//     if (contract) {
//       try {
//         const tx = await contract.withdrawAsInvestor(ethers.parseEther(amount));
//         await tx.wait();
//       } catch (error) {
//         console.error('Error withdrawing:', error);
//       }
//     }
//   };

//   const getInvestorBalance = async () => {
//     if (contract) {
//       try {
//         const balance = await contract.getInvestorBalance();
//         return ethers.formatEther(balance);
//       } catch (error) {
//         console.error('Error fetching balance:', error);
//         return '0';
//       }
//     }
//   };

//   const createInsuranceGroup = async (amt) => {
//     if (contract) {
//       try {
//         const tx = await contract.createInsuranceGroup({ value: ethers.parseEther(amt) });
//         await tx.wait();
//       } catch (error) {
//         console.error('Error creating insurance group:', error);
//       }
//     }
//   };

//   const registerForGroup = async (groupIndex) => {
//     if (contract) {
//       try {
//         const amt='0.001';
//         const tx = await contract.registerForGroup(groupIndex, { value: ethers.parseEther(amt) });
//         await tx.wait();
//       } catch (error) {
//         console.error('Error registering for group:', error);
//       }
//     }
//   };

//   const payPremium = async (groupIndex) => {
//     if (contract) {
//       try {
//         const amt='0.001';
//         const tx = await contract.payPremium(groupIndex, { value: ethers.parseEther(amt) });
//         await tx.wait();
//       } catch (error) {
//         console.error('Error paying premium:', error);
//       }
//     }
//   };
  

//   const submitClaim = async (groupIndex, amount, textHash, fileHash) => {
//     if (contract) {
//       try {
//         const tx = await contract.submitClaim(groupIndex, ethers.parseEther(amount), textHash, fileHash);
//         await tx.wait();
//       } catch (error) {
//         console.error('Error submitting claim:', error);
//       }
//     }
//   };

//   const approveClaim = async (groupIndex, claimIndex) => {
//     if (contract) {
//       try {
//         const tx = await contract.approveClaim(groupIndex, claimIndex);
//         await tx.wait();
//       } catch (error) {
//         console.error('Error approving claim:', error);
//       }
//     }
//   };

//   const fetchClaimFromGroupByIndex = async (groupIndex, claimIndex) => {
//     if (contract) {
//       try {
//         const claim = await contract.fetchClaimFromGroupByIndex(groupIndex, claimIndex);
//         return claim;
//       } catch (error) {
//         console.error('Error fetching claim:', error);
//         return null;
//       }
//     }
//   };

//   const getGroupBalance = async (groupIndex) => {
//     if (contract) {
//       try {
//         const balance = await contract.getGroupBalance(groupIndex);
//         return ethers.formatEther(balance);
//       } catch (error) {
//         console.error('Error fetching group balance:', error);
//         return '0';
//       }
//     }
//   };

//   const GroupCount = async () => {
//     if (contract) {
//       try {
//         const count = await contract.GroupCount();
//         return count.toNumber();
//       } catch (error) {
//         console.error('Error fetching group count:', error);
//         return 0;
//       }
//     }
//   };

//   const numUsersInGroup = async (groupIndex) => {
//     if (contract) {
//       try {
//         const numUsers = await contract.numUsersInGroup(groupIndex);
//         return numUsers.toNumber();
//       } catch (error) {
//         console.error('Error fetching number of users in group:', error);
//         return 0;
//       }
//     }
//   };

//   return (
//     <InsuranceContext.Provider
//       value={{
//         addBalanceAsInvestor,
//         registerAsInvestor,
//         withdrawAsInvestor,
//         getInvestorBalance,
//         createInsuranceGroup,
//         registerForGroup,
//         payPremium,
//         submitClaim,
//         approveClaim,
//         fetchClaimFromGroupByIndex,
//         getGroupBalance,
//         GroupCount,
//         numUsersInGroup,
//       }}
//     >
//       {children}
//     </InsuranceContext.Provider>
//   );
// };

// export { InsuranceContext, InsuranceProvider };
import React, { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import InsuranceABI from './InsuranceABI.json';

const InsuranceContext = createContext();

const InsuranceProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [groupCount, setGroupCount] = useState(0);

  const contractAddress = '0x2712190e10f425FD35756A5b5FC0E3BA1c1021b8';

  const initProvider = async () => {
    if (window.ethereum) {
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(web3Provider);
      const web3Signer = await web3Provider.getSigner();
      setSigner(web3Signer);
      const insuranceContract = new ethers.Contract(contractAddress, InsuranceABI, web3Signer);
      setContract(insuranceContract);
    } else {
      console.error('Ethereum provider not found');
    }
  };

  useEffect(() => {
    initProvider();
  }, []);

  useEffect(() => {
    const fetchGroupCount = async () => {
      if (contract) {
        try {
          const count = await contract.GroupCount();
          console.log('GroupCount type:', typeof count, count);
          
          // Since count is a bigint, convert it to a normal number for React state
          setGroupCount(Number(count));
          console.log('count: ',Number(count));
          
        } catch (error) {
          console.error('Error fetching group count:', error);
        }
      }
    };

    fetchGroupCount();
  }, [contract]);

  const createInsuranceGroup = async (amt) => {
    if (contract) {
      try {
        const tx = await contract.createInsuranceGroup({ value: ethers.parseEther(amt) });
        await tx.wait();
        const count = await contract.GroupCount();
        
        // Since count is a bigint, convert it to a normal number for React state
        setGroupCount(Number(count));
        
      } catch (error) {
        console.error('Error creating insurance group:', error);
      }
    }
  };

  const addBalanceAsInvestor = async (amount) => {
    if (contract) {
      try {
        const tx = await contract.addBalanceAsInvestor({ value: ethers.parseEther(amount) });
        await tx.wait();
      } catch (error) {
        console.error('Error adding balance:', error);
      }
    }
  };

  const registerAsInvestor = async (amount) => {
    if (contract) {
      try {
        const tx = await contract.registerAsInvestor({ value: ethers.parseEther(amount) });
        await tx.wait();
      } catch (error) {
        console.error('Error registering as investor:', error);
      }
    }
  };

  const withdrawAsInvestor = async (amount) => {
    if (contract) {
      try {
        const tx = await contract.withdrawAsInvestor(ethers.parseEther(amount));
        await tx.wait();
      } catch (error) {
        console.error('Error withdrawing:', error);
      }
    }
  };

  const getInvestorBalance = async () => {
    if (contract) {
      try {
        const balance = await contract.getInvestorBalance();
        return ethers.formatEther(balance);
      } catch (error) {
        console.error('Error fetching balance:', error);
        return '0';
      }
    }
  };

  const registerForGroup = async (groupIndex) => {
    if (contract) {
      try {
        const amt = '0.001';
        const tx = await contract.registerForGroup(groupIndex, { value: ethers.parseEther(amt) });
        await tx.wait();
      } catch (error) {
        console.error('Error registering for group:', error);
      }
    }
  };

  const payPremium = async (groupIndex) => {
    if (contract) {
      try {
        const amt = '0.001';
        const tx = await contract.payPremium(groupIndex, { value: ethers.parseEther(amt) });
        await tx.wait();
      } catch (error) {
        console.error('Error paying premium:', error);
      }
    }
  };

  const submitClaim = async (groupIndex, amount, textHash, fileHash) => {
    if (contract) {
      try {
        const tx = await contract.submitClaim(groupIndex, ethers.parseEther(amount), textHash, fileHash);
        await tx.wait();
      } catch (error) {
        console.error('Error submitting claim:', error);
      }
    }
  };

  const approveClaim = async (groupIndex, claimIndex) => {
    if (contract) {
      try {
        const tx = await contract.approveClaim(groupIndex, claimIndex);
        await tx.wait();
      } catch (error) {
        console.error('Error approving claim:', error);
      }
    }
  };

  const fetchClaimFromGroupByIndex = async (groupIndex, claimIndex = null) => {
    if (!contract) {
      console.error("Contract not initialized");
      return [];
    }
    
    try {
      if (claimIndex === null) {
        // Fetch total number of claims in the group
        const numClaims = await contract.fetchClaimFromGroupByIndex(groupIndex);
        return numClaims.toNumber(); // Convert BigNumber to a regular number
      } else {
        // Fetch a specific claim by index
        const claim = await contract.getClaim(groupIndex, claimIndex);
        return {
          sender: claim.sender,
          amount: ethers.utils.formatEther(claim.amount),
          textHash: claim.textHash,
          fileHash: claim.fileHash,
        };
      }
    } catch (error) {
      console.error("Error fetching claim:", error);
      return undefined;
    }
  };

  const getGroupBalance = async (groupIndex) => {
    if (contract) {
      try {
        const balance = await contract.getGroupBalance(groupIndex);
        return ethers.formatEther(balance);
      } catch (error) {
        console.error('Error fetching group balance:', error);
        return '0';
      }
    }
  };

  const numUsersInGroup = async (groupIndex) => {
    if (contract) {
      try {
        const numUsers = await contract.numUsersInGroup(groupIndex);
        return numUsers.toNumber();
      } catch (error) {
        console.error('Error fetching number of users in group:', error);
        return 0;
      }
    }
  };

  return (
    <InsuranceContext.Provider
      value={{
        addBalanceAsInvestor,
        registerAsInvestor,
        withdrawAsInvestor,
        getInvestorBalance,
        createInsuranceGroup,
        registerForGroup,
        payPremium,
        submitClaim,
        approveClaim,
        fetchClaimFromGroupByIndex,
        getGroupBalance,
        GroupCount: groupCount,
        numUsersInGroup,
      }}
    >
      {children}
    </InsuranceContext.Provider>
  );
};

export { InsuranceContext, InsuranceProvider };

