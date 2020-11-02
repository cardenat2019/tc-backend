const express = require('express');

const app = express();

app.use(require('./client.route'));

module.exports = app;