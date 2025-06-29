import React, { createContext, useState, useEffect } from 'react';

export const PlayersContext = createContext();

export const PlayersProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockData = [
    {
      id: 1,
      name: "Lionel Messi",
      rating: 93,
      club: "Inter Miami",
      nation: "Argentina",
      position: "RW",
      age: 36,
      image: "https://cdn.sofifa.net/players/158/023/24_60.png"
    }
  ];

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(`https://fifa22-players-data.p.rapidapi.com/list/10`, {
          method: 'GET',
          headers: {
            'x-rapidapi-key': 'c38602cdb5mshd9e0c685601701cp191e8bjsn025efaf60c4b',
            'x-rapidapi-host': 'fifa22-players-data.p.rapidapi.com'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPlayers(data.result || []);
        console.log('API data:', data);
      } catch (error) {
        console.warn('Using mock data due to API error:', error.message);
        setPlayers(mockData);
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
