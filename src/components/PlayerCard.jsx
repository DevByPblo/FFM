import React, { useContext, useState, useEffect } from "react";
 
import { Badge } from "../components/ui/Badge";

const PlayerCard = ({ player }) => {
  const getStatColor = (stat) => {
    const value = parseInt(stat);
    if (value >= 80) return "text-green-400";
    if (value >= 70) return "text-yellow-400";
    if (value >= 60) return "text-orange-400";
    return "text-red-400";
  };

  const StatItem = ({ label, value }) => (
    <div className="flex justify-between items-center py-1">
      <span className="text-xs text-gray-300 uppercase tracking-wide">
        {label}
      </span>
      <span className={`text-sm font-bold ${getStatColor(value)}`}>
        {value}
      </span>
    </div>
  );

  return (
    <div className="relative w-120 h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl shadow-2xl overflow-hidden transform hover:scale-75 transition-all duration-300 scale-60 py-2">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
      {/* Header Section */}
      <div className="relative p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={player.Flag}
            alt={player.Nationality}
            className="w-8 h-6 rounded shadow-lg"
          />
          <img
            src={player.Club_Logo}
            alt={player.Club}
            className="w-8 h-8 rounded shadow-lg"
          />
        </div>
        <div className="text-right">
          <div className="text-6xl font-black text-white drop-shadow-lg">
            {player.Overall}
          </div>
          <div className="text-xs text-gray-300 uppercase tracking-wider">
            {player.Position}
          </div>
        </div>
      </div>
      {/* Player Photo Section */}
      <div className="relative flex justify-center -mt-2">
        <div className="relative">
          <img
            src={player.Photo}
            alt={player.Name}
            className="w-32 h-32 object-cover rounded-full border-4 border-white/20 shadow-2xl"
          />
          <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full">
            #{player.Jersey_Number}
          </div>
        </div>
      </div>
      {/* Player Info */}
      <div className="px-4 mt-4 text-center">
        <h2 className="text-xl font-bold text-white mb-1 drop-shadow-lg">
          {player.Name}
        </h2>
        <div className="flex justify-center space-x-4 text-sm text-gray-300 mb-4">
          <span>Age: {player.Age}</span>
          <span>{player.Heightcm}cm</span>
          <span>{player.Preferred_Foot} Foot</span>
        </div>
        <Badge
          variant="secondary"
          className="bg-white/10 text-white border-white/20"
        >
          {player.Club}
        </Badge>
      </div>
      {/* Stats Grid */}
      <div className="px-4 mt-4 grid grid-cols-2 gap-4 text-white">
        <div className="bg-black/20 rounded-lg p-3 backdrop-blur-sm">
          <h3 className="text-xs font-bold text-center mb-2 text-gray-300 uppercase tracking-wider">
            Attack
          </h3>
          <StatItem label="Finishing" value={player.Finishing} />
          <StatItem label="Shot Power" value={player.ShotPower} />
          <StatItem label="Volleys" value={player.Volleys} />
          <StatItem label="Positioning" value={player.Positioning} />
        </div>

        <div className="bg-black/20 rounded-lg p-3 backdrop-blur-sm">
          <h3 className="text-xs font-bold text-center mb-2 text-gray-300 uppercase tracking-wider">
            Skill
          </h3>
          <StatItem label="Dribbling" value={player.Dribbling} />
          <StatItem label="Ball Control" value={player.BallControl} />
          <StatItem label="Short Pass" value={player.ShortPassing} />
          <StatItem label="Vision" value={player.Vision} />
        </div>

        <div className="bg-black/20 rounded-lg p-3 backdrop-blur-sm">
          <h3 className="text-xs font-bold text-center mb-2 text-gray-300 uppercase tracking-wider">
            Movement
          </h3>
          <StatItem label="Acceleration" value={player.Acceleration} />
          <StatItem label="Sprint Speed" value={player.SprintSpeed} />
          <StatItem label="Agility" value={player.Agility} />
          <StatItem label="Balance" value={player.Balance} />
        </div>

        <div className="bg-black/20 rounded-lg p-3 backdrop-blur-sm ">
          <h3 className="text-xs font-bold text-center mb-2 text-gray-300 uppercase tracking-wider">
            Defense
          </h3>
          <StatItem label="Interceptions" value={player.Interceptions} />
          <StatItem label="Marking" value={player.Marking} />
          <StatItem label="Stand Tackle" value={player.StandingTackle} />
          <StatItem label="Slide Tackle" value={player.SlidingTackle} />
        </div>
      </div>
      <div className="px-6 mt-6 mb-8 flex justify-around bg-black/30 rounded-lg text-white text-sm font-semibold shadow-md">
        <div className="flex flex-col items-center">
          <span className="text-gray-300 uppercase text-xs">Value</span>
          <span>£{parseFloat(player["Value£"]).toLocaleString()}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray-300 uppercase text-xs">Wage</span>
          <span>£{parseFloat(player["Wage£"]).toLocaleString()}</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 pb-2"></div>
    </div>
  );
};

export default PlayerCard;
