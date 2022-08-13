import React from 'react'
import { Link } from 'react-router-dom'

function LeagueListCard({ league }) {
  return (
    <div key={league.id} className="league-card">
      <h1>{league.name}</h1>
      <img src={league.logos.light} alt={league.name + ' logo'} />
      <Link to={`/league/${league.id}`} className="league-card-button">Ver más</Link>
    </div>
  )
}

export default LeagueListCard