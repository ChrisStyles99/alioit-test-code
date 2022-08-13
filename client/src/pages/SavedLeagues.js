import React from 'react'
import { Link } from 'react-router-dom';
import { useAxiosGet } from '../hooks/useAxiosGet';

function SavedLeagues() {
  const { data, isLoading, isError } = useAxiosGet('/all-leagues');

  if(isLoading) return <div className="league-list-page">Cargando...</div>

  return (
    <div className="league-list-page">
      {isError && <p>Hubo un error al traer los datos</p>}
      {data?.length < 1 && <p>No hay ligas guardadas</p>}
      {data?.map(league => {
        return <div key={league._id} className="league-card">
          <h1>{league.leagueName}</h1>
          <img src={league.leagueLogo} alt={league.leagueName} />
          <Link to={`/saved/${league.leagueId}`} state={league} className="league-card-button">Ver más</Link>
        </div>
      })}
    </div>
  )
}

export default SavedLeagues