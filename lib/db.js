const mongoose = require('mongoose');
const logger = require('./logger');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/dsy-test", { useNewUrlParser: true })
    .catch(err => {
        logger.error(err.name, err.message)
        logstash('err', err.message, "Database Error", err);
    })

const db = mongoose.connection;

db.on('error', function callback() {
    console.error.bind(console, 'DB connection error:')
});
db.once('open', function callback() {
    logger.log("Success Conecting DB");
});

module.exports = db;