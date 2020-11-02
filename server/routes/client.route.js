const express = require('express');

const cors = require("cors");

const ClientController = require('../controllers/client.controller');

let app = express();

// ===========================
//  Rutas para Clientes
// ===========================

app.get(process.env.API_URL + '/client', cors(), ClientController.getList);

app.get(process.env.API_URL + '/client/:id', cors(), ClientController.getOne);

app.post(process.env.API_URL + '/client', cors(), ClientController.create);

app.put(process.env.API_URL + '/client/:id', cors(), ClientController.update); 

app.delete(process.env.API_URL + '/client/:id', cors(), ClientController.delete); 

module.exports = app;

