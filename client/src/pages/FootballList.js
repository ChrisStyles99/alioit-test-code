import React from 'react'
import { useLocation } from 'react-router-dom';
import LeagueListCard from '../components/LeagueListCard';
import { useAxiosFootball } from '../hooks/useAxiosFootball'

function FootballList() {

  const location = useLocation();
  console.log(location);

  const { data, isLoading, isError } = useAxiosFootball('/leagues');

  if(isLoading) return <div className="league-list-page">Cargando...</div>

  return (
    <div className="league-list-page">
      {isError && <p>Hubo un error al traer los datos</p>}
      {data?.map(league => {
        return <LeagueListCard league={league} />
      })}
    </div>
  )
}

export default FootballList