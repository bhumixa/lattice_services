'use strict';

const dbconn = require('../database');
const moment = require("moment");

function getAllFtps() {
    return new Promise((resolve, reject) => {
        dbconn.query('SELECT * FROM tblFtpMaster', [], function (err, results) {
            if (err) {
                return reject(error)
            }

            console.log(results);

            return resolve(results);
        })
    })
}

function addNewFtp(data){
    return new Promise((resolve, reject) => {
        let searchString = JSON.stringify(data.searchString);
        let exportTemplateId = data.exportTemplateId
        let partyMasterId = data.partyMasterId
        let serverUrl = data.serverUrl
        let action = data.action
        let userName = data.userName
        let password = data.password;
        let runningTime =  new Date().toISOString().slice(0, 19).replace('T', ' ');
        let isActive = data.isActive;
        let createdBy = data.createdBy;        
        let createdDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let modifiedBy = data.modifiedBy;
        let modifiedDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

        let sql = "INSERT into tblFtpMaster  (searchString, exportTemplateId, partyMasterId, serverUrl, action, userName, password, runningTime, isActive, createdBy, createdDate, modifiedBy, modifiedDate) values('" + JSON.stringify(data.searchString) + "','" + exportTemplateId + "','" + partyMasterId + "','" + serverUrl + "','" + action + "','" + userName + "','" + password + "','" + runningTime + "','" + isActive + "','" + createdBy + "','" + createdDate + "','" + modifiedBy + "', '" + modifiedDate + "')";

        dbconn.query(sql, [], function (err, results) {
            if (err) {
                console.log(err)
                return reject(error)
            }

            console.log(results);

            return resolve(results);
        })
    })
}

function editFtp(ftpId, data){
    return new Promise((resolve, reject) => {
        let searchString = JSON.stringify(data.searchString);
        let exportTemplateId = data.exportTemplateId
        let partyMasterId = data.partyMasterId
        let serverUrl = data.serverUrl
        let action = data.action
        let userName = data.userName
        let password = data.password;
        let runningTime =  new Date().toISOString().slice(0, 19).replace('T', ' ');
        let isActive = data.isActive;
        let createdBy = data.createdBy;        
        let createdDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let modifiedBy = data.modifiedBy;
        let modifiedDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

        var sql = "UPDATE tblFtpMaster SET searchString = '" + JSON.stringify(data.searchString) + "', exportTemplateId = '" +exportTemplateId + "', partyMasterId = '" +partyMasterId + "', serverUrl = '" +serverUrl + "', action = '" +action + "', isActive = '" +isActive + "', modifiedBy = '" +modifiedBy + "',  modifiedDate = '" +modifiedDate + "' WHERE id =" +ftpId;
        dbconn.query(sql, [], function (err, results) {
            if (err) {
                console.log(err)
                return reject(error)
            }

            console.log(results);

            return resolve(results);
        })
    })
}

function deleteFtp(ftpId){
    return new Promise((resolve, reject) => {
        console.log(ftpId)
        var sql = "DELETE FROM tblFtpMaster WHERE id =" +ftpId;
        dbconn.query(sql, [], function (err, results) {
            if (err) {
                console.log(err)
                return reject(error)
            }

            console.log(results);

            return resolve(results);
        })
    })
}


const ftpMasterServicesPlugin = {
    name: 'ftpMasterServices',
    version: '1.0.0',
    register: async function (server, options) {

        // route for get all ftp details
        server.route({
            method: 'GET',
            path: '/getAllFtps',
            handler: async (request, h) => { 
                const results = await getAllFtps();
                return {
                    data: {
                        results: results
                    },
                    page: 'FTP Master -- ',
                };
            }
        });

        //route for add new ftp
        server.route({
            method: 'POST',
            path: '/ftp/add',
            handler: async (request, h) => { 
                const results = await addNewFtp(request.payload);
                return {
                    data: {
                        results: results
                    },
                    page: 'FTP Master -- ',
                };
            }
        });

        //route for edit ftp
        server.route({
            method: 'POST',
            path: '/ftp/update/{ftpId}',
            handler: async (request, h) => { 
                const results = await editFtp(request.params.ftpId, request.payload);
                return {
                    data: {
                        results: results
                    },
                    page: 'FTP Master -- ',
                };
            }
        });

        //route for delete ftp
        server.route({
            method: 'PUT',
            path: '/ftp/{ftpId}',
            handler: async (request, h) => { 
                const results = await deleteFtp(request.params.ftpId);
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

module.exports = ftpMasterServicesPlugin