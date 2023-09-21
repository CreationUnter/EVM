//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract VotingMachine {
    // Define the data structures for the EVM
    struct Voter {
        uint voterID;
        string name;
        bool hasVoted;
    }
    
    struct Candidate {
        uint candidateID;
        string name;
        uint voteCount;
    }
    
    // Define the variables for the EVM
    mapping (address => Voter) public voters;
    Candidate[] public candidates;
    address public administrator;
    bool public votingClosed;
    
    // Define the events for the EVM
    event VoterRegistered(address voter);
    event VoteCast(address voter, uint candidateID);
    event VotingClosed();
    
    // Define the constructor function for the EVM
    constructor() {
        administrator = msg.sender;
        votingClosed = false;
    }
    
    // Define the functions for the EVM
    
    // This function allows the administrator to register a voter by providing their voter ID and name.
    function registerVoter(uint _voterID, string memory _name) public {
        require(msg.sender == administrator, "Only the administrator can register voters");
        require(voters[msg.sender].voterID == 0, "This address has already been registered as a voter");
        voters[msg.sender] = Voter(_voterID, _name, false);
        emit VoterRegistered(msg.sender);
    }
    
    // This function allows the administrator to add a candidate by providing their candidate ID and name.
    function addCandidate(uint _candidateID, string memory _name) public {
        require(msg.sender == administrator, "Only the administrator can add candidates");
        candidates.push(Candidate(_candidateID, _name, 0));
    }
    
    // This function allows a registered voter to cast a vote for a candidate.
    function castVote(uint _candidateID) public {
        require(voters[msg.sender].voterID != 0, "You must be a registered voter to cast a vote");
        require(voters[msg.sender].hasVoted == false, "You have already cast your vote");
        require(votingClosed == false, "Voting is closed");
        candidates[_candidateID].voteCount++;
        voters[msg.sender].hasVoted = true;
        emit VoteCast(msg.sender, _candidateID);
    }
    
    // This function allows the administrator to close the voting process.
    function closeVoting() public {
        require(msg.sender == administrator, "Only the administrator can close voting");
        require(votingClosed == false, "Voting is already closed");
        votingClosed = true;
        emit VotingClosed();
    }
}
