import React, { createContext, useState, useEffect } from "react";

export const PlayersContext = createContext();

export const PlayersProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockData = [
    {
      ID: 10,
      Name: "Lionel Messi",
      Age: 36,
      Photo:
        "https://upload.wikimedia.org/wikipedia/commons/a/a1/Lionel_Messi_20180626_%283x4_cropped%29.jpg",
      Nationality: "Argentina",
      Flag: "https://wallpaper-house.com/data/out/6/wallpaper2you_90093.jpg",
      Overall: 93,
      Potential: 93,
      Club: "Inter Miami",
      Club_Logo:
        "https://images.mlssoccer.com/image/upload/v1620747207/assets/mia/logos/mia_nanfgz.png",
      "Value£": "70000000.0",
      "Wage£": "600000.0",
      Special: 2003,
      Preferred_Foot: "Left",
      International_Reputation: "5.0",
      Weak_Foot: "5.0",
      Skill_Moves: "5.0",
      Work_Rate: "Medium/ Low",
      Body_Type: "Lean (170-185)",
      Real_Face: "Yes",
      Position: "RW",
      Jersey_Number: "10",
      Joined: "2023-07-15",
      Loaned_From: "None",
      Contract_Valid_Until: "2025",
      Heightcm: 170,
      Weightlbs: "159",
      Crossing: "85.0",
      Finishing: "95.0",
      HeadingAccuracy: "70.0",
      ShortPassing: "92.0",
      Volleys: "88.0",
      Dribbling: "96.0",
      Curve: "95.0",
      FKAccuracy: "94.0",
      LongPassing: "91.0",
      BallControl: "96.0",
      Acceleration: "85.0",
      SprintSpeed: "80.0",
      Agility: "95.0",
      Reactions: "96.0",
      Balance: "95.0",
      ShotPower: "85.0",
      Jumping: "68.0",
      Stamina: "75.0",
      Strength: "65.0",
      LongShots: "93.0",
      Aggression: "48.0",
      Interceptions: "40.0",
      Positioning: "95.0",
      Vision: "98.0",
      Penalties: "85.0",
      Composure: "96.0",
      Marking: "30.0",
      StandingTackle: "28.0",
      SlidingTackle: "25.0",
      GKDiving: "6.0",
      GKHandling: "11.0",
      GKKicking: "15.0",
      GKPositioning: "14.0",
      GKReflexes: "7.0",
      Best_Position: "RW",
      Best_Overall_Rating: "93.0",
      "Release_Clause£": "250000000.0",
      DefensiveAwareness: "35.0",
      Year_Joined: 2023,
    },
  ];

  useEffect(() => {
    const fetchPlayers = async () => {
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
        setPlayers(data.result || []);
        console.log("API data:", data);
      } catch (error) {
        console.warn("Using mock data due to API error:", error.message);
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
