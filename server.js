const express = require('express');
const http = require('http');
const path = require('path');

const appServer = express();
appServer.use(express.static(path.join(__dirname, 'app/')));

appServer.get('*', (req, res) => {
    console.log('Request');
    res.sendFile(__dirname + 'app/index.html');
});

http.createServer(appServer).listen(3007, function() {
    console.log('Express server listening on port');
});
