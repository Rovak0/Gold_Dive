const { connect, connection } = require('mongoose');
// require("dotenv").config();

// const connectionString = 'mongodb://127.0.0.1:27017/financeDB';
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/goldDive';

connect(connectionString);

module.exports = connection;
