const http = require('http');
const fs = require('fs');
const server = http.createServer(app);
import { PORT } from "./constants/backend.common.constant";
import app from './app';
import Schedule from './job';

import mongoose from "mongoose";

const mongodb = mongoose.connect(
  // 'mongodb://13.250.65.125:27017/sapomanager?readPreference=primary&directConnection=true&ssl=false'
  // 'mongodb://18.141.196.195:27017/sapomanager?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'
  'mongodb://localhost:27017/sapomanager?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'
  // 'mongodb://sapodb:xhbXHCckwFK7W5pLZhYtNRHRfCZElLXm3KLERpGxbFntArb7BfbW4VcIKWCAXxFHYavsLJWIVzHewDfdIKIlVg==@sapodb.mongo.cosmos.azure.com:10255/sapomanager?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000'
  ).then((res) => {
    console.log("Connect mongodb successfully")
  }).catch((err) => {
    console.log("Connect mongodb falure");
  })
// process.on("uncaughtException", (err) => fs.writeFile('./logs/uncaught.log', `${new Date().toLocaleString()} --- ${err} --- ${__filename}\n`, { flag: 'wx' }, function (err) {
//     if (err) throw err;
// }));


app.set('port', PORT);

server.listen(app.get('port'), () => console.log("######## app running on port " + PORT + " ########"));

Schedule.getInstance();

server.on('error', onError)

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges')
            break
        case 'EADDRINUSE':
            console.error(bind + ' is already in use')
            break
        default:
            throw error
    }
}