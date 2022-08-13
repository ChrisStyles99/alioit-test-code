import React from 'react'
import { Link } from 'react-router-dom'

function SavedLeagueListCard({league}) {
  return (
    <div key={league._id} className="league-card">
      <h1>{league.leagueName}</h1>
      <img src={league.leagueLogo} alt={league.leagueName} />
      <Link to={`/saved/${league.leagueId}`} state={league} className="league-card-button">Ver más</Link>
    </div>
  )
}

export default SavedLeagueListCard