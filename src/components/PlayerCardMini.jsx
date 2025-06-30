import React, { useContext, useState, useEffect } from "react";

const PlayerCardMini = ({ player }) => {
  const getStatColor = (stat) => {
    const value = parseInt(stat);
    if (value >= 80) return "text-green-400";
    if (value >= 70) return "text-yellow-400";
    if (value >= 60) return "text-orange-400";
    return "text-red-400";
  };

  const StatItem = ({ label, value }) => (
    <div className="flex flex-col items-center">
      <span className="text-[10px] text-gray-400 uppercase">{label}</span>
      <span className={`text-sm font-bold ${getStatColor(value)}`}>
        {value}
      </span>
    </div>
  );

  return (
    <div className="w-64 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-xl shadow-lg p-3 text-white select-none">
      <div className="flex justify-between items-center mb-3">
        <img
          src={player.Flag}
          alt={player.Nationality}
          className="w-6 h-4 rounded shadow"
        />
        <div className="text-xs font-semibold tracking-wide uppercase">
          {player.Position}
        </div>
        <div className="text-2xl font-extrabold drop-shadow">
          {player.Overall}
        </div>
        <img
          src={player.Club_Logo}
          alt={player.Club}
          className="w-6 h-6 rounded shadow"
        />
      </div>

      {/* Player Photo */}
      <div className="flex justify-center mb-3">
        <img
          src={player.Photo}
          alt={player.Name}
          className="w-20 h-20 object-cover rounded-full border-2 border-white/30 shadow-md"
        />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-6 gap-2 text-center">
        <StatItem label="PAC" value={player.Acceleration} />
        <StatItem label="Sho" value={player.Finishing} />
        <StatItem label="Pas" value={player.ShortPassing} />
        <StatItem label="Dri" value={player.Dribbling} />
        <StatItem label="Def" value={player.Interceptions} />
        <StatItem label="Phy" value={player.Strength} />
      </div>
    </div>
  );
};

export default PlayerCardMini;
