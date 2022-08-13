import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
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
      <div className="select-season-card">
        <h2>Buscar estadisticas por temporada</h2>
        <form onSubmit={handleSubmit}>
          <select name="" id="" placeholder="Selecciona una temporada" value={selectedSeason} onChange={e => setSelectedSeason(e.target.value)}>
            <option value="">Seleccione una temporada</option>
            {location.state.leagueSeasons.map(season => (
              <option key={season} value={season}>{season}</option>
            ))}
          </select>
          <button className="league-card-button">Buscar</button>
        </form>
      </div>
      <div className="season-stats-card">
        {selectedSeasonData.length < 1 && <p>No hay estadisticas para esta temporada</p>}
        {selectedSeasonData.map(team => (
          <div key={team._id} className="team-stats-card">
            <h2>{team.teamName}</h2>
            <div className="team-stats-body">
              <img src={team.teamLogo} alt={team.teamName} />
              <div className="team-stats">
                <h3>Temporada: {team.season}</h3>
                <h3>Ranking: {team.teamRank}</h3>
                <h3>Puntos: {team.teamPoints}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SavedLeague