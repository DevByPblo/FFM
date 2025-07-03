import React, { useContext } from "react";
import BuildTeam from "./components/BuildTeam";
import { PlayersContext } from "./context/PlayersContext";
import PlayerCardMini from "./components/PlayerCardMini";
import './App.css'

function App() {
  const { players, loading } = useContext(PlayersContext);

  if (loading) return <div>Loading...</div>;

 
  const player = players && players.length > 0 ? players[0] : null;

  return (
    <div className="App">
      <BuildTeam />
      
    </div>
  );
}

export default App;
