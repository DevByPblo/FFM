import React, { createContext, useState, useEffect } from "react";
import MockData from "../data/MockData";

export const PlayersContext = createContext();

export const PlayersProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      console.log(MockData);
      try {
        const response = await fetch(
          `https://fifa22-players-data.p.rapidapi.com/list/10`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-key":
                "c38602cdb5mshd9e0c685601701cp191e8bjsn025efaf60c4b",
              "x-rapidapi-host": "fifa22-players-data.p.rapidapi.com",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPlayers(data.result || MockData);
        console.log("API data:", data);
      } catch (error) {
        console.warn("Using mock data due to API error:", error.message);
        setPlayers(MockData);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <PlayersContext.Provider value={{ players, loading }}>
      {children}
    </PlayersContext.Provider>
  );
};
