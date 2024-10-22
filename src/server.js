"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var data = require("./data");
var cors = require("cors");
var port = 3000;
var app = express();
var percorso = path.join(__dirname);
app.use(cors());
app.use(express.static(percorso));
app.use(express.static(path.join(percorso, '/src')));
app.get('/api/data', function (req, res) {
    res.json(data);
});
app.listen(port, function () {
    console.log("Server connesso alla porta ".concat(port));
});
