"use strict";
exports.__esModule = true;
var http = require("http");
var host = process.env.HOST || 'localhost';
var port = process.env.PORT ? parseInt(process.env.PORT) : 8000;
var requestListener = function (req, res) {
    res.writeHead(200);
    res.end("My first server!");
};
var server = http.createServer(requestListener);
server.listen(port, host, function () {
    console.log("Server is running on http://".concat(host, ":").concat(port));
});
