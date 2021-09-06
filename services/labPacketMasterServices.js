'use strict';

const dbconn = require('../database');
const moment = require("moment");

function getAllLabPacketSeries() {
    return new Promise((resolve, reject) => {
        console.log('getAllLabPacketSeries')
        resolve("getAllLabPacketSeries")
    })
}

const labPackServicePlugin = {
    name: 'labPackServices',
    version: '1.0.0',
    register: async function (server, options) {

        // route for get all ftp details
        server.route({
            method: 'GET',
            path: '/getAllLabPacketSeries',
            handler: async (request, h) => { 
                const results = await getAllLabPacketSeries();
                return {
                    data: {
                        results: results
                    },
                    page: 'FTP Master -- ',
                };
            }
        });

       
    }
};

module.exports = labPackServicePlugin