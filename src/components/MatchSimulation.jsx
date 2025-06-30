import React, { useState, useEffect, useRef } from "react";

const MatchSimulation = ({ userStrength, aiStrength }) => {
  const [matchResult, setMatchResult] = useState(null);
  const [timer, setTimer] = useState(null);
  const intervalRef = useRef(null);

  const simulateMatch = () => {
    const userScoreRaw = userStrength + Math.random() * 20;
    const aiScoreRaw = aiStrength + Math.random() * 20;

    const userGoals = Math.floor(userScoreRaw / 50);
    const aiGoals = Math.floor(aiScoreRaw / 50);

    let result = "Draw";
    if (userGoals > aiGoals) result = "User Wins!";
    else if (aiGoals > userGoals) result = "AI Wins!";

    setMatchResult({ userGoals, aiGoals, result });
  };

  const startMatchTimer = () => {
    setMatchResult(null);
    setTimer(3);

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(intervalRef.current);
          simulateMatch();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="p-4 border rounded max-w-sm mx-auto text-center mt-6">
      <button
        onClick={startMatchTimer}
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={timer !== null}
      >
        Simulate Match
      </button>

      {timer !== null && <div className="mt-4 text-lg">Timer: {timer}s</div>}

      {matchResult && (
        <div className="mt-4">
          <h3>Match Result:</h3>
          <p>
            User Team {matchResult.userGoals} - {matchResult.aiGoals} AI Team
          </p>
          <p className="font-bold">{matchResult.result}</p>
        </div>
      )}
    </div>
  );
};

export default MatchSimulation;
