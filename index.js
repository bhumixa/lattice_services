'use strict';

const Hapi = require('@hapi/hapi');
const dbconn = require('./database');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });    

    //await server.register([Inert.plugin, Vision.plugin]);
    await server.register([require('./services/ftpMasterServices'),require('./services/labPacketMasterServices')])
     

    await server.start();

    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();