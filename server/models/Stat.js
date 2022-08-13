const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statSchema = new Schema({
  season: String,
  leagueName: String,
  leagueAbbr: String,
  teamName: String,
  teamId: String,
  teamLogo: String,
  teamRank: Number,
  teamPoints: Number
});

module.exports = mongoose.model('Stat', statSchema);