import React, { useState, useEffect } from 'react';
import { Container, Form, Button, ListGroup, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import VotingContract from './VotingContract.json'; // Replace with your own contract ABI

const web3 = new Web3("Replace with your own URL"); 
const contractAddress = "Replace with your own contract address"; 
const contractInstance = new web3.eth.Contract(VotingContract.abi, contractAddress);

function VotingInterface() {
  const [candidates, setCandidates] = useState([]);
  const [voters, setVoters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [voterAddress, setVoterAddress] = useState('');

  // Load the list of candidates and voters from the contract
  useEffect(() => {
    async function loadCandidates() {
      setIsLoading(true);
      try {
        const candidateCount = await contractInstance.methods.getCandidateCount().call();
        const candidatePromises = [];
        for (let i = 0; i < candidateCount; i++) {
          candidatePromises.push(contractInstance.methods.getCandidate(i).call());
        }
        const candidateResults = await Promise.all(candidatePromises);
        setCandidates(candidateResults);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    }

    async function loadVoters() {
      setIsLoading(true);
      try {
        const voterCount = await contractInstance.methods.getVoterCount().call();
        const voterPromises = [];
        for (let i = 0; i < voterCount; i++) {
          voterPromises.push(contractInstance.methods.getVoter(i).call());
        }
        const voterResults = await Promise.all(voterPromises);
        setVoters(voterResults);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    }

    loadCandidates();
    loadVoters();
  }, []);

  // Handle the form submission to cast a vote
  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      await contractInstance.methods.castVote(selectedCandidate).send({ from: voterAddress });
      setSelectedCandidate(null);
      setVoterAddress('');
      alert('Vote cast successfully!');
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }

  return (
    <Container>
      <h1>Electronic Voting Machine</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <h2>Candidates:</h2>
      <ListGroup>
        {candidates.map(candidate => (
          <ListGroup.Item key={candidate.id}>
            {candidate.name} ({candidate.voteCount} votes)
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h2>Voters:</h2>
      <ListGroup>
        {voters.map(voter => (
          <ListGroup.Item key={voter}>
            {voter}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h2>Cast your vote:</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="candidateSelect">
          <Form.Label>Select a candidate:</Form.Label>
          <Form.Control
            as="select"
            value={selectedCandidate}
            onChange={event => setSelectedCandidate(event.target)}
            required>
            <option value="" disabled>Select a candidate</option>
            {candidates.map(candidate => (
              <option value={candidate.id} key={candidate.id}>{candidate.name}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="voterAddress">
          <Form.Label>Enter your Ethereum address:</Form.Label>
          <Form.Control
            type="text"
            placeholder="0x1234567890abcdef1234567890abcdef12345678"
            value={voterAddress}
            onChange={event => setVoterAddress(event.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>Submit</Button>
      </Form>
      <p>Don't have an Ethereum address? <Link to="https://metamask.io/">Get MetaMask</Link> to create one.</p>
    </Container>
    );
}


