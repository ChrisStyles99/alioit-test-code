require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dbConnection = require('./database/connection');
const League = require('./models/League');
const Stat = require('./models/Stat');

const PORT = process.env.PORT || 5000;
dbConnection();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
});

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.set('socket-io', io);

app.get('/all-leagues', async(req, res) => {
  const socket = req.app.get('socket-io');
  socket.emit('getting-leagues', 'Se están trayendo las ligas');
  try {
    const leagues = await League.find();
    if(leagues.length < 1) {
      socket.emit('getting-leagues-error', 'No hay ligas guardadas');
      return res.json(leagues);
    }
    socket.emit('getting-leagues-success', 'Se trajeron las ligas con exito');
    res.status(200).json(leagues);
  } catch (error) {
    socket.emit('getting-leagues-error', 'Hubo un error al traer los datos');
    res.status(500).json({error: true, msg: 'Hubo un error al traer los datos'});
  }
});

app.get('/league-stats', async(req, res) => {
  const socket = req.app.get('socket-io');
  socket.emit('getting-stats', 'Se están trayendo las estadisticas');
  try {
    const stats = await Stat.find({season: req.query.season, leagueAbbr: req.query.leagueAbbr});
    if(stats.length < 1) {
      socket.emit('getting-stats-error', 'No hay estadisticas para la temporada seleccionada');
      return res.status(400).json({error: true, msg: 'No hay estadisticas para la temporada seleccionada'});
    }
    socket.emit('getting-stats-success', 'Se trajeron las estadisticas con exito');
    res.status(200).json(stats);
  } catch (error) {
    socket.emit('getting-stats-error', 'Hubo un error al traer la información');
    res.status(500).json({error: true, msg: 'Hubo un error al traer los datos'});
  }
});

app.post('/add-league', async(req, res) => {
  const socket = req.app.get('socket-io');
  socket.emit('adding-league', 'Se está guardando la información de la liga');
  const league = await League.find({
    leagueId: req.body.leagueId,
  });
  if(league.length > 0) {
    socket.emit('adding-league-error', 'La liga ya se ha guardado');
    return res.status(400).json({error: true, msg: 'La liga ya se ha guardado'});
  }
  if(!req.body.leagueId || !req.body.leagueName || !req.body.leagueLogo || !req.body.leagueAbbr || req.body.leagueSeasons.length < 1) {
    socket.emit('adding-league-error', 'Por favor envie los datos correctamente');
    return res.status(400).json({error: true, message: 'Por favor envie los datos correctamente'});
  }
  await League.create({
    leagueId: req.body.leagueId,
    leagueName: req.body.leagueName,
    leagueLogo: req.body.leagueLogo,
    leagueAbbr: req.body.leagueAbbr,
    leagueSeasons: req.body.leagueSeasons
  });
  socket.emit('adding-league-success', 'Liga añadida correctamente');
  res.status(201).json({error: false, message: 'Liga añadida correctamente'});
});

app.post('/add-stats', async(req, res) => {
  const socket = req.app.get('socket-io');
  socket.emit('adding-stat', 'Se está guardando la información');
  const stat = await Stat.find({
    leagueName: req.body.leagueName,
    season: req.body.season,
    teamId: req.body.teamId
  });
  if(stat.length > 0) {
    socket.emit('adding-stat-error', 'La estadistica ya se ha guardado');
    return res.status(400).json({error: true, msg: 'La estadistica ya se ha guardado'});
  }
  if(!req.body.season || !req.body.leagueName || !req.body.leagueAbbr || !req.body.teamName || !req.body.teamId || !req.body.teamLogo || !req.body.teamRank || !req.body.teamPoints) {
    socket.emit('adding-stat-error', 'Por favor envie los datos correctamente');
    return res.status(400).json({error: true, message: 'Por favor envie los datos correctamente'});
  }
  await Stat.create({
    season: req.body.season,
    leagueName: req.body.leagueName,
    leagueAbbr: req.body.leagueAbbr,
    teamName: req.body.teamName,
    teamId: req.body.teamId,
    teamLogo: req.body.teamLogo,
    teamRank: req.body.teamRank,
    teamPoints: req.body.teamPoints
  });
  socket.emit('adding-stat-success', 'Estadistica añadida correctamente');
  res.status(201).json({error: false, message: 'Estadistica añadida correctamente'});
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});