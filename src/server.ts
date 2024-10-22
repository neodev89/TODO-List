import { Request, Response } from "express";

const express = require("express");
const path = require("path");
const data = require("./data");
const cors = require("cors");

const port = 3000;
const app = express();
const percorso = path.join(__dirname);

app.use(cors());
app.use(express.static(percorso));
app.use(express.static(path.join(percorso, '/src')));

app.get('/api/data', (req: Request, res: Response) => {
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server connesso alla porta ${port}`)
});
