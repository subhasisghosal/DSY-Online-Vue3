const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const logger = require('./lib/logger');
const db = require('./lib/db');

var app = express()
var PORT = process.env.PORT || 3300

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

const routes = fs.readdirSync(path.join(__dirname, '/routes'))
for (const routesFile of routes) {
    if (routesFile.match(/\.js$/)) {
        require(path.join(__dirname, '/routes/', routesFile))(app)
    }
}
// routes.forEach(routesFile => {
//     if (routesFile.match(/\.js$/)) {
//         var route = require(path.join(__dirname, '/routes/', routesFile))
//         route(app)
//     }
// });

app.listen(PORT, function() {
        logger.log('server started on port ' + PORT)
    })
    .on('error', err => {
        logger.error(err)
    })

module.exports = app;