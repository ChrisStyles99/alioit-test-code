import React from 'react'

function SavedLeagueCard({team}) {
  return (
    <div key={team._id} className="team-stats-card">
      <h2>{team.teamName}</h2>
      <div className="team-stats-body">
        <img src={team.teamLogo} alt={team.teamName} />
        <div className="team-stats">
          <h3>Temporada: {team.season}</h3>
          <h3>Ranking: {team.teamRank}</h3>
          <h3>Puntos: {team.teamPoints}</h3>
        </div>
      </div>
    </div>
  )
}

export default SavedLeagueCard