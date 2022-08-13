const mongoose = require('mongoose');

const dbConnection = () => {
  mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }).then(() => console.log('Connected to database'))
  .catch(error => console.log(error));
}

module.exports = dbConnection;