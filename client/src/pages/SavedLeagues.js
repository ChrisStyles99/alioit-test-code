import React from 'react'
import { useAxiosGet } from '../hooks/useAxiosGet';

function SavedLeagues() {
  const { data, isLoading, isError } = useAxiosGet('/all-leagues');
  return (
    <div>
      {JSON.stringify(data)}
    </div>
  )
}

export default SavedLeagues