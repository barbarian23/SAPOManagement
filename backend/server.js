const http = require('http');
const server = http.createServer(app);
import { PORT } from "./constants/backend.common.constant";
import app from './app';

process.on("uncaughtException", (err) => fs.appendFileSync('./logs/uncaught.log', `${new Date().toLocaleString()} --- ${err} --- ${__filename}\n`, 'utf8'));

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