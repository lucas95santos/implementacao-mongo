const { Router } = require('express');
// controllers
const developerController = require('./controllers/DeveloperController');
const actionsController = require('./controllers/ActionsController');

const routes = Router();

// rota para listar todos os desenvolvedores que não foram curtidos e nem foram não curtidos
routes.get('/devs', developerController.listAll);

// rota para cadastrar um desenvolvedor
routes.post('/devs', developerController.create);

// rota para atualizar um desenvolvedor
routes.put('/devs/:id', developerController.update);

// rota para remover um desenvolvedor
routes.delete('/devs/:id', developerController.delete);

// rota para dar like em algum desenvolvedor
routes.post('/devs/:developerId/likes', actionsController.like);

// rota para dar dislike em algum desenvolvedor
routes.post('/devs/:developerId/dislikes', actionsController.dislike);

module.exports = routes;
