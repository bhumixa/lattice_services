const MySQL = require('mysql');
var config = require('./environment.json')[process.env.NODE_ENV || 'development'];

console.log(config.host)

const dbconn = MySQL.createConnection(config);

dbconn.connect(function(err) {
    if (err) {
        console.error('[mysql error]' + err.stack);
        return;
    }
});

module.exports = dbconn;