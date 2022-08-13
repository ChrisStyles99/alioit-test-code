import React from 'react'
import { useLocation } from 'react-router-dom';
import { useAxiosFootball } from '../hooks/useAxiosFootball'

function FootballList() {

  const location = useLocation();
  console.log(location);

  const { data, isLoading, isError } = useAxiosFootball('/leagues');

  return (
    <div>
      {data?.map(league => {
        return <div key={league.id}>
          <h1>{league.name}</h1>
          <img src={league.logos.light} alt={league.name + ' logo'} />
        </div>
      })}
    </div>
  )
}

export default FootballList