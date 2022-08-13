import React from 'react'

function SelectCard({ selectedSeason, setSelectedSeason, handleSubmit, seasons }) {
  return (
    <div className="select-season-card">
      <h2>Buscar estadisticas por temporada</h2>
      <form onSubmit={handleSubmit}>
        <select placeholder="Selecciona una temporada" value={selectedSeason} onChange={e => setSelectedSeason(e.target.value)}>
          <option value="">Seleccione una temporada</option>
          {seasons.map(season => (
            <option key={season} value={season}>{season}</option>
          ))}
        </select>
        <button className="league-card-button">Buscar</button>
      </form>
    </div>
  )
}

export default SelectCard