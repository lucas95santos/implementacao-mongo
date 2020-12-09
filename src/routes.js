const { Router } = require('express');
// controllers
const developerController = require('./controllers/DeveloperController');

const routes = Router();

routes.post('/devs', developerController.create);

module.exports = routes;
