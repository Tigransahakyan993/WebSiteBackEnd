const express = require('express');
const rout = express();
const cors = require('cors');

rout.use(cors());
rout.use(express.json());

module.exports = rout;
