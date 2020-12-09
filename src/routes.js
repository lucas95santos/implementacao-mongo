const { Router } = require('express');
// controllers
const developerController = require('./controllers/DeveloperController');

const routes = Router();

// rota para cadastrar um desenvolvedor
routes.post('/devs', developerController.create);

// rota para dar like em algum desenvolvedor
routes.post('/devs/:developerId/likes', developerController.like);

// rota para dar dislike em algum desenvolvedor
routes.post('/devs/:developerId/dislikes', developerController.dislike);

module.exports = routes;
