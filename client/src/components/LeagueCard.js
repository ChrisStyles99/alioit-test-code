import React from 'react'

function LeagueCard({team, handleClick}) {
  return (
    <div key={team.team.id} className="team-stats-card">
      <h2>{team.team.name}</h2>
      <div className="team-stats-body">
        <img src={team.team.logos?.[0]?.href} alt={team.team.name} />
        <div className="team-stats">
          <h3>Ranking: {team.stats[8].value}</h3>
          <h3>Puntos: {team.stats[6].value}</h3>
          <button onClick={() => handleClick(team)} className="league-card-button">Guardar estadistica</button>
        </div>
      </div>
    </div>
  )
}

export default LeagueCard