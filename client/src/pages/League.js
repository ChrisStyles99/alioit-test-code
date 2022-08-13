import React from 'react'
import { useParams } from 'react-router-dom'
import { useAxiosFootball } from '../hooks/useAxiosFootball'

function League() {
  const params = useParams();
  console.log(params);
  const { data, isLoading, isError } = useAxiosFootball(`/leagues/${params.leagueId}`);
  return (
    <div>
      <h1>{data?.name}</h1>
      <img src={data?.logos?.light} alt={data?.name} />
    </div>
  )
}

export default League