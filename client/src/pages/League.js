import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { footballInstance } from '../utils/axiosInstance';
import { useAxiosFootball } from '../hooks/useAxiosFootball'
import { useAxiosPost } from '../hooks/useAxiosPost';

function League() {
  const params = useParams();
  
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedSeasonData, setSelectedSeasonData] = useState([]);

  const { postData } = useAxiosPost('/add-stats');
  const { postData: postLeague } = useAxiosPost('/add-league');

  const { data, isLoading, isError } = useAxiosFootball(`/leagues/${params.leagueId}`);
  const { data: seasonsData, isLoading: seasonsLoading, isError: seasonsError } = useAxiosFootball(`/leagues/${params.leagueId}/seasons`);

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(selectedSeason);
    const seasonData = await footballInstance.get(`/leagues/${data?.id}/standings?season=${selectedSeason}&sort=asc`);
    console.log(seasonData.data.data.standings);
    setSelectedSeasonData(seasonData.data.data.standings);
  }

  const handleSave = async() => {
    await postLeague({
      leagueId: data.id,
      leagueName: data.name,
      leagueLogo: data.logos.light,
      leagueAbbr: data.abbr,
      leagueSeasons: seasons
    })
  }

  const handleClick = async(statData) => {
    await postData({
      season: selectedSeason,
      leagueName: data?.name,
      leagueAbbr: data?.abbr,
      teamName: statData.team.name,
      teamId: statData.team.id,
      teamLogo: statData.team.logos?.[0]?.href,
      teamRank: statData.stats[8].value,
      teamPoints: statData.stats[6].value
    });
  }

  useEffect(() => {
    if(seasonsData === null) return
    setSeasons(seasonsData.seasons.map(season => season.year));
  }, [seasonsData]);

  if(isLoading) return <div className="league-page">Cargando...</div>

  return (
    <div className="league-page">
      <div className="league-card">
        {isError && <p>Hubo un error al traer los datos</p>}
        <h1>{data?.name}</h1>
        <img src={data?.logos?.light} alt={data?.name} />
        <button onClick={handleSave} className="league-card-button">Guardar liga</button>
      </div>
      <div className="select-season-card">
        <h2>Buscar estadisticas por temporada</h2>
        <form onSubmit={handleSubmit}>
          <select name="" id="" placeholder="Selecciona una temporada" value={selectedSeason} onChange={e => setSelectedSeason(e.target.value)}>
            <option value="">Seleccione una temporada</option>
            {seasons.map(season => (
              <option key={season} value={season}>{season}</option>
            ))}
          </select>
          <button className="league-card-button">Buscar</button>
        </form>
      </div>
      <div className="season-stats-card">
        {seasonsError && <p>Hubo un error al traer los datos</p>}
        {!seasonsLoading && selectedSeasonData.map(team => (
          <div key={team.team.id} className="team-stats-card">
            <h2>{team.team.name}</h2>
            <div className="team-stats-body">
              <img src={team.team.logos?.[0]?.href} alt={team.team.name} />
              <div className="team-stats">
                <h3>Ranking: {team.stats[8].value}</h3>
                <h3>Puntos: {team.stats[6].value}</h3>
                <button onClick={() => handleClick(team)} className="league-card-button">Guardar estadistica</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default League