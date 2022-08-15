import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import SavedLeagueCard from '../components/SavedLeagueCard';
import SelectCard from '../components/SelectCard';
import { baseInstance } from '../utils/axiosInstance';

function SavedLeague() {

  const location = useLocation();

  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedSeasonData, setSelectedSeasonData] = useState([]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const data = await baseInstance.get(`/league-stats?season=${selectedSeason}&leagueAbbr=${location.state.leagueAbbr}`);
      setSelectedSeasonData(data.data);
    } catch (error) {
      setSelectedSeasonData([]);
    }
  }

  return (
    <div className="league-page">
      <div className="league-card">
        <h1>{location.state.leagueName}</h1>
        <img src={location.state.leagueLogo} alt={location.state.leagueName} />
      </div>
      <SelectCard selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} handleSubmit={handleSubmit} seasons={location.state.leagueSeasons} />
      <div className="season-stats-card">
        {selectedSeasonData.length < 1 && <p>No hay estadisticas para esta temporada</p>}
        {selectedSeasonData.map(team => (
          <SavedLeagueCard team={team} key={team._id} />
        ))}
      </div>
    </div>
  )
}

export default SavedLeague