const http = require('http');
const fs = require('fs');
const server = http.createServer(app);
import { PORT } from "./constants/backend.common.constant";
import app from './app';

import mongoose from "mongoose";

const mongodb = mongoose.connect(
  'mongodb://sapodb:xhbXHCckwFK7W5pLZhYtNRHRfCZElLXm3KLERpGxbFntArb7BfbW4VcIKWCAXxFHYavsLJWIVzHewDfdIKIlVg==@sapodb.mongo.cosmos.azure.com:10255/sapomanager?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000'
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