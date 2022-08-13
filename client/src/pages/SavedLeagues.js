import React from 'react'
import SavedLeagueListCard from '../components/SavedLeagueListCard';
import { useAxiosGet } from '../hooks/useAxiosGet';

function SavedLeagues() {
  const { data, isLoading, isError } = useAxiosGet('/all-leagues');

  if(isLoading) return <div className="league-list-page">Cargando...</div>

  return (
    <div className="league-list-page">
      {isError && <p>Hubo un error al traer los datos</p>}
      {data?.length < 1 && <p>No hay ligas guardadas</p>}
      {data?.map(league => {
        return <SavedLeagueListCard league={league} />
      })}
    </div>
  )
}

export default SavedLeagues