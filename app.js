const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);

const LISTENING_PORT = 8080;

server.listen(LISTENING_PORT);

app.use(express.static(__dirname + '/public'));

console.log('Listening on port: ' + LISTENING_PORT);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
})