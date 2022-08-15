import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { footballInstance } from '../utils/axiosInstance';
import { useAxiosFootball } from '../hooks/useAxiosFootball'
import { useAxiosPost } from '../hooks/useAxiosPost';
import LeagueCard from '../components/LeagueCard';
import SelectCard from '../components/SelectCard';

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
    const seasonData = await footballInstance.get(`/leagues/${data?.id}/standings?season=${selectedSeason}&sort=asc`);
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
      <SelectCard selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} handleSubmit={handleSubmit} seasons={seasons} />
      <div className="season-stats-card">
        {seasonsError && <p>Hubo un error al traer los datos</p>}
        {!seasonsLoading && selectedSeasonData.map(team => (
          <LeagueCard team={team} handleClick={handleClick} key={team.team.id} />
        ))}
      </div>
    </div>
  )
}

export default League