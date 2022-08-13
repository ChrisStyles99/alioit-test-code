const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leagueSchema = new Schema({
  leagueId: String,
  leagueName: String,
  leagueLogo: String,
  leagueAbbr: String
});

module.exports = mongoose.model('League', leagueSchema);