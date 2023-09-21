## Electronic Voting Machine (EVM) Interface

This project provides a user interface for an Electronic Voting Machine (EVM) on the Ethereum blockchain. It allows registered voters to cast their votes for candidates, displays the list of candidates and voters, and provides the ability to close the voting process. The EVM is implemented using a Solidity smart contract, and the frontend is developed using React.js.

# Smart Contract
VotingMachine.sol
Contract Name: VotingMachine
Description: This Solidity smart contract defines the data structures, functions, and events for an electronic voting machine. It includes the ability to register voters, add candidates, cast votes, and close the voting process.

# Frontend
VotingInterface.jsx
This React component provides the frontend user interface for interacting with the Ethereum smart contract. It includes the following features:

Displaying the list of candidates and their vote counts.
Displaying the list of registered voters.
Allowing registered voters to cast their votes for candidates.
Handling the registration of voters by the administrator.
Handling the addition of candidates by the administrator.
Allowing the administrator to close the voting process.

# Prerequisites
Before running the project, make sure you have the following:
Node.js installed on your system.
Metamask extension installed in your browser.
An Ethereum wallet with test Ether for testing on a local blockchain or real Ether for deploying on the Ethereum mainnet.

# Install the project dependencies:
npm install

Replace the following placeholders in VotingInterface.jsx with your own values:
Replace "Replace with your own URL" with your Ethereum node URL.
Replace "Replace with your own contract address" with the address of your deployed VotingMachine contract.
# Start the React development server:
npm start
Open your web browser and access the application at http://localhost:3000.

# Usage
Use the application to register voters and add candidates using the Ethereum address of the administrator.

Registered voters can select a candidate and cast their votes by providing their Ethereum address.

The list of candidates and their vote counts, as well as the list of registered voters, will be displayed.

The administrator can close the voting process when needed.

# Smart Contract Deployment
To deploy the VotingMachine smart contract on the Ethereum blockchain, follow these steps:

Compile the smart contract using Solidity compiler.

Deploy the compiled contract to the Ethereum blockchain using tools like Remix, Truffle, or Hardhat.

Obtain the contract address and update the contractAddress variable in the React frontend.
