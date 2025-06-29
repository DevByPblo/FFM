import React, { useContext } from 'react';
import { PlayersContext } from '../context/PlayersContext.jsx';
import PlayerCard from './PlayerCard.jsx';

const PlayersList = () => {
  const { players, loading } = useContext(PlayersContext);

  if (loading) return <p>Loading players...</p>;

  if (!Array.isArray(players)) {
    return <p>Error: Players data is not an array.</p>;
  }

  return (
    <div className="players-list grid grid-cols-4 gap-y-px2 ">
      {players.map((player) => (
        <PlayerCard key={player.ID || player.id} player={player} />
      ))}
    </div>
  );
};

export default PlayersList;
