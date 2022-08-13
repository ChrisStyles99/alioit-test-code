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
  console.log(socket);
  socket.emit('getting-leagues', 'Se están trayendo las ligas');
  const leagues = await League.find();
  socket.emit('getting-leagues-success', 'Se trajeron las ligas con exito');
  res.status(200).json(leagues);
});

app.get('/league-stats', async(req, res) => {
  const stats = await Stat.find({season: req.query.season, leagueAbbr: req.query.leagueAbbr});

  res.status(200).json(stats);
});

app.post('/add-league', async(req, res) => {
  if(!req.body.leagueId || !req.body.leagueName || !req.body.leagueLogo || !req.body.leagueAbbr) {
    return res.status(400).json({error: true, message: 'Por favor envie los datos correctamente'});
  }
  await League.create({
    leagueId: req.body.leagueId,
    leagueName: req.body.leagueName,
    leagueLogo: req.body.leagueLogo,
    leagueAbbr: req.body.leagueAbbr
  });
  res.status(201).json({error: false, message: 'Liga añadida correctamente'});
});

app.post('/add-stats', async(req, res) => {
  if(!req.body.season || !req.body.leagueName || !req.body.leagueAbbr || !req.body.teamName || !req.body.teamId || !req.body.teamLogo || !req.body.teamRank || !req.body.teamPoints) {
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
  res.status(201).json({error: false, message: 'Estadistica añadida correctamente'});
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});