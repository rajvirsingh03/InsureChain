// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract MyContract {
    struct Claim {
        address sender;
        uint amount;
        string textHash;
        string fileHash;
        uint numApprovals;
        bool paid;
        mapping(address => bool) approvals; // Track which investors have approved
    }
    struct InsuranceGroup {
        mapping(address => bool) registeredUsers;
        mapping(address => bool) paidUsers;
        address[] users;
        uint lastUpdatedTime;
        uint requiredMonthlyPayment;
        uint totalAmountWithdrawn;
        uint groupBalance;
        Claim[] claims;
    }
    InsuranceGroup[] public groups;
    mapping(address => uint) public investorBalances;
    address[] public investors;

    // Events for front-end interaction
    event LogRegistration(uint groupIndex, address sender);
    event LogDeregistration(uint groupIndex, address user);
    event LogPaidPremium(uint groupIndex, uint premium, address user);
    event LogWithdrawal(uint groupIndex, address receiver, uint amount);
    event LogCreation(uint groupIndex);
    event LogSubmitClaim(
        address user,
        uint groupIndex,
        string textHash,
        string fileHash
    );
    event LogApprovedClaim(address investor, uint claimGroup, uint claimIndex);

    // User functions
    function registerForGroup(uint groupIndex) external payable {
        require(msg.value == 0.001 ether, "Registration fee is 0.001 ether");
        InsuranceGroup storage group = groups[groupIndex];
        require(!group.registeredUsers[msg.sender], "User already registered");

        group.users.push(msg.sender);
        group.registeredUsers[msg.sender] = true;
        group.paidUsers[msg.sender] = true;
        group.groupBalance += msg.value;

        emit LogRegistration(groupIndex, msg.sender);

        updateMonthly(groupIndex);
    }

    function deregisterForGroup(uint groupIndex) external {
        InsuranceGroup storage group = groups[groupIndex];
        require(group.registeredUsers[msg.sender], "User not registered");

        group.registeredUsers[msg.sender] = false;
        group.paidUsers[msg.sender] = false;

        group.groupBalance -= 1 ether;
        payable(msg.sender).transfer(1 ether);

        emit LogDeregistration(groupIndex, msg.sender);
    }

    function payPremium(uint groupIndex) external payable {
        InsuranceGroup storage group = groups[groupIndex];
        require(
            msg.value == group.requiredMonthlyPayment,
            "Incorrect premium amount"
        );
        require(!group.paidUsers[msg.sender], "Premium already paid");

        group.paidUsers[msg.sender] = true;
        group.groupBalance += msg.value;

        emit LogPaidPremium(groupIndex, msg.value, msg.sender);

        updateMonthly(groupIndex);
    }

    function submitClaim(
        uint groupIndex,
        uint amount,
        string memory textHash,
        string memory fileHash
    ) external {
        InsuranceGroup storage group = groups[groupIndex];
        require(group.registeredUsers[msg.sender], "User not registered");
        require(group.paidUsers[msg.sender], "Premium not paid");

        Claim storage newClaim = group.claims.push();
        newClaim.sender = msg.sender;
        newClaim.amount = amount;
        newClaim.textHash = textHash;
        newClaim.fileHash = fileHash;
        newClaim.numApprovals = 0;
        newClaim.paid = false;

        emit LogSubmitClaim(msg.sender, groupIndex, textHash, fileHash);
    }

    function approveClaim(uint groupIndex, uint claimIndex) external {
        InsuranceGroup storage group = groups[groupIndex];
        Claim storage claim = group.claims[claimIndex];

        require(
            investorBalances[msg.sender] >= 0.1 ether,
            "Investor balance too low"
        );
        require(!claim.paid, "Claim already paid");
        require(!claim.approvals[msg.sender], "Investor already approved");

        claim.approvals[msg.sender] = true;
        claim.numApprovals += 1;
        emit LogApprovedClaim(msg.sender, groupIndex, claimIndex);

        // Require majority approval
        if (claim.numApprovals > investors.length / 2) {
            claim.paid = true;
            payable(claim.sender).transfer(claim.amount);
            group.groupBalance -= claim.amount;
        }
    }

    // Investor functions
    function registerAsInvestor() external payable {
        require(msg.value >= 0.1 ether, "Minimum investment is 0.1 ether");
        investorBalances[msg.sender] += msg.value;
        investors.push(msg.sender);
    }

    function addBalanceAsInvestor() external payable {
        require(investorBalances[msg.sender] > 0, "Not an investor");
        investorBalances[msg.sender] += msg.value;
    }

    function withdrawAsInvestor(uint amount) external {
        require(amount <= investorBalances[msg.sender], "Insufficient balance");
        investorBalances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    //Group Management
    function createInsuranceGroup() external payable {
        require(
            msg.value >= 0.01 ether,
            "Minimum initial balance is 0.01 ether"
        );

        InsuranceGroup storage newGroup = groups.push();
        newGroup.lastUpdatedTime = block.timestamp;
        newGroup.groupBalance = msg.value;
        newGroup.requiredMonthlyPayment = 0.001 ether; //monthly premium

        emit LogCreation(groups.length - 1);
    }

    function updateMonthly(uint groupIndex) internal {
        InsuranceGroup storage group = groups[groupIndex];
        if (block.timestamp >= group.lastUpdatedTime + 30 days) {
            group.lastUpdatedTime = block.timestamp;
            for (uint i = 0; i < group.users.length; i++) {
                group.paidUsers[group.users[i]] = false;
            }
            group.totalAmountWithdrawn = 0;
        }
    }

    // Utility functions
    function getGroupBalance(uint groupIndex) external view returns (uint) {
        return groups[groupIndex].groupBalance;
    }

    function GroupCount() external view returns (uint) {
        return groups.length;
    }

    function getInvestorBalance() external view returns (uint) {
        return investorBalances[msg.sender];
    }

    function numUsersInGroup(uint groupIndex) external view returns (uint) {
        return groups[groupIndex].users.length;
    }

    function fetchClaimFromGroupByIndex(
        uint groupIndex,
        uint claimIndex
    ) external view returns (address, uint, string memory, string memory) {
        Claim storage claim = groups[groupIndex].claims[claimIndex];
        return (claim.sender, claim.amount, claim.textHash, claim.fileHash);
    }
}
