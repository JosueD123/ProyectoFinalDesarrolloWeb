import React, { useState } from 'react';

const Voting: React.FC = () => {
  const [selectedCandidate, setSelectedCandidate] = useState('');

  const handleVote = () => {
    console.log(`Voted for: ${selectedCandidate}`); // Aquí se enviaría el voto al backend
  };

  return (
    <div className="container mt-5">
      <h2>Voting</h2>
      <ul>
        <li>
          <input
            type="radio"
            name="candidate"
            value="Candidate 1"
            onChange={(e) => setSelectedCandidate(e.target.value)}
          />
          Candidate 1
        </li>
        <li>
          <input
            type="radio"
            name="candidate"
            value="Candidate 2"
            onChange={(e) => setSelectedCandidate(e.target.value)}
          />
          Candidate 2
        </li>
      </ul>
      <button onClick={handleVote}>Vote</button>
    </div>
  );
};

export default Voting;
