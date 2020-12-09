const { Router } = require('express');
// controllers
const developerController = require('./controllers/DeveloperController');

const routes = Router();

// rota para listar todos os desenvolvedores que não foram curtidos e nem foram não curtidos
routes.get('/devs', developerController.listAll);

// rota para cadastrar um desenvolvedor
routes.post('/devs', developerController.create);

// rota para dar like em algum desenvolvedor
routes.post('/devs/:developerId/likes', developerController.like);

// rota para dar dislike em algum desenvolvedor
routes.post('/devs/:developerId/dislikes', developerController.dislike);

module.exports = routes;
