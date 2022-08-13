import React from 'react'
import { Link, useLocation } from 'react-router-dom';
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
        return <div key={league.id} className="league-card">
          <h1>{league.name}</h1>
          <img src={league.logos.light} alt={league.name + ' logo'} />
          <Link to={`/league/${league.id}`} className="league-card-button">Ver más</Link>
        </div>
      })}
    </div>
  )
}

export default FootballList