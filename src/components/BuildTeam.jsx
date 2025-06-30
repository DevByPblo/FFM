import React, { useState } from "react";
import MatchSimulation from "./MatchSimulation";
import mockPlayers from "../data/MockPlayers";

const BuildTeam = () => {
  const [userTeam, setUserTeam] = useState([]);
  const [aiTeam, setAiTeam] = useState([]);
  const [teamsReady, setTeamsReady] = useState(false);

  const togglePlayer = (player) => {
    const isSelected = userTeam.some((p) => p.ID === player.ID);

    if (isSelected) {
      setUserTeam(userTeam.filter((p) => p.ID !== player.ID));
    } else {
      if (userTeam.length < 5) {
        setUserTeam([...userTeam, player]);
      }
    }
  };

  const createAITeam = () => {
    const available = mockPlayers.filter(
      (p) => !userTeam.some((userP) => userP.ID === p.ID)
    );
    const shuffled = [...available].sort(() => 0.5 - Math.random());
    setAiTeam(shuffled.slice(0, 5));
    setTeamsReady(true);
  };

  const totalStrength = (team) =>
    team.reduce((sum, p) => sum + (parseInt(p.Overall) || 0), 0);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Select 5 Players</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
        {mockPlayers.map((player) => {
          const isSelected = userTeam.some((p) => p.ID === player.ID);
          return (
            <div
              key={player.ID}
              className={`p-2 border rounded cursor-pointer text-sm ${
                isSelected
                  ? "bg-green-100 border-green-400"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => togglePlayer(player)}
            >
              <img
                src={player.Photo}
                alt={player.Name}
                className="w-16 h-16 object-cover rounded-full mx-auto mb-1"
              />
              <div className="text-center font-semibold">{player.Name}</div>
              <div className="text-center text-xs text-gray-600">
                {player.Position} | OVR: {player.Overall}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={createAITeam}
        disabled={userTeam.length !== 5}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        Create AI Team
      </button>

      {teamsReady && (
        <>
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-2">Team Strength</h3>
            <div className="flex justify-between mb-4">
              <div>
                <h4 className="font-semibold mb-1">
                  Your Team ({totalStrength(userTeam)})
                </h4>
                <ul className="text-sm">
                  {userTeam.map((p) => (
                    <li key={p.ID}>
                      {p.Name} ({p.Overall})
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-1">
                  AI Team ({totalStrength(aiTeam)})
                </h4>
                <ul className="text-sm bg-red-600">
                  {aiTeam.map((p) => (
                    <li key={p.ID}>
                      {p.Name} ({p.Overall})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <MatchSimulation
            userStrength={totalStrength(userTeam)}
            aiStrength={totalStrength(aiTeam)}
          />
        </>
      )}
    </div>
  );
};

export default BuildTeam;
