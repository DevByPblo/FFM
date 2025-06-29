import Papa from 'papaparse';

fetch('/player-data-full.csv')
  .then(res => res.text())
  .then(csvText => {
    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true
    });

    const players = parsed.data.slice(0, 10).map(transformCSVRow);  
    console.log(JSON.stringify(players, null, 2));  
  });

function transformCSVRow(row) {
  const n = (val) => Number(val) || 0;

  return {
    id: n(row.player_id),
    name: row.name,
    country: row.country_name,
    image: row.image,
    strength: n(row.overall_rating),
    assignedPosition: null,
    positionStrength: {
      GK: n(row.gk_positioning),
      LB: n(row.sliding_tackle),
      CB: n(row.heading_accuracy),
      RB: n(row.crossing),
      CDM: n(row.interceptions),
      CM: n(row.short_passing),
      CAM: n(row.vision),
      LW: n(row.dribbling),
      RW: n(row.curve),
      ST: n(row.finishing),
    },
    stats: {
      PAS: n(row.short_passing),
      SHO: n(row.shot_power),
      DRI: n(row.dribbling),
      DEF: n(row.defensive_awareness),
      PHY: n(row.strength),
      SPD: (n(row.acceleration) + n(row.sprint_speed)) / 2,
      GKD: n(row.gk_diving),
      GKH: n(row.gk_handling),
      GKK: n(row.gk_kicking),
      GKP: n(row.gk_positioning),
      GKR: n(row.gk_reflexes),
    }
  };
}
