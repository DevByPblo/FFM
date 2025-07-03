import React, { useContext, useState } from "react";
import MatchSimulation from "./MatchSimulation";
import PlayerCardMini from "./PlayerCardMini";
import { PlayersContext } from "../context/PlayersContext";

const BuildTeam = () => {
  const [userTeam, setUserTeam] = useState([]);
  const [aiTeam, setAiTeam] = useState([]);
  const [teamsReady, setTeamsReady] = useState(false);
  const [numberSelected, setNumberSelected] = useState(5);

  const { players, loading } = useContext(PlayersContext);

  const togglePlayer = (player) => {
    const isSelected = userTeam.some((p) => p.ID === player.ID);

    if (isSelected) {
      setUserTeam(userTeam.filter((p) => p.ID !== player.ID));
      setNumberSelected((prev) => prev + 1);
    } else if (userTeam.length < 5) {
      setUserTeam([...userTeam, player]);
      setNumberSelected((prev) => prev - 1);
    }
  };

  const createAITeam = () => {
    const available = players.filter(
      (p) => !userTeam.some((userP) => userP.ID === p.ID)
    );
    const shuffled = [...available].sort(() => 0.5 - Math.random());
    setAiTeam(shuffled.slice(0, 5));
    setTeamsReady(true);
  };

  const totalStrength = (team) =>
    team.reduce((sum, p) => sum + (parseInt(p.Overall) || 0), 0);

  if (loading) return <p className="text-white">Loading players...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-Black">
            {numberSelected === 0
              ? 'Your Team is Ready'
              : numberSelected < 5
              ? `Pick ${numberSelected} More Players`
              : `Pick ${numberSelected} Players`}
      </h2>

     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
        {players.map((player) => {
          const isSelected = userTeam.some((p) => p.ID === player.ID);
          return (
            <div
              key={player.ID}
              onClick={() => togglePlayer(player)}
              className={`cursor-pointer p-1 rounded border hover:scale-105 transition ease-in ${
                isSelected ? "grayscale-75  " : "border-transparent "
              }`}
            >
              <PlayerCardMini player={player} />
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
            <h3 className="text-lg font-bold mb-2 text-white">Team Strength</h3>
            <div className="flex justify-between flex-wrap gap-4 mb-4">
              <div>
                <h4 className="font-semibold mb-2 text-white">
                  Your Team ({totalStrength(userTeam)})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {userTeam.map((p) => (
                    <PlayerCardMini key={p.ID} player={p} />
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-white">
                  AI Team ({totalStrength(aiTeam)})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {aiTeam.map((p) => (
                    <PlayerCardMini key={p.ID} player={p} />
                  ))}
                </div>
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