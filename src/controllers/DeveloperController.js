const axios = require('axios');
// model
const Developer = require('../models/Developer');

class DeveloperController {
  async listAll(request, response) {
    const { user } = request.headers;

    if (!user) {
      return response.status(404).json({ error: 'O id deve ser informado' });
    }

    const loggedDev = await Developer.findById(user);

    const users = await Developer.find({
      $and: [
        { _id: { $ne: loggedDev._id } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } }
      ]
    });

    return response.json(users);
  }

  async create(request, response) {
    const { username } = request.body;

    const userExists = await Developer.findOne({ user: username });

    if (userExists) {
      return response.json(userExists);
    }

    const githubResponse = await axios.get(`https://api.github.com/users/${username}`);
    const { name, bio, avatar_url } = githubResponse.data;

    const developer = await Developer.create({
      name: name !== null ? name : "Sem nome",
      user: username,
      bio: bio !== null ? bio : "Sem bio",
      avatar: avatar_url
    });

    return response.json(developer);
  }

  async delete(request, response) {
    const { id } = request.params;

    const user = await Developer.findById(id);

    if (!user) {
      return response.status(404).json({
        error: `Não existe desenvolvedor com o id ${id}`
      });
    }

    const result = await Developer.deleteOne(user);

    if (!result) {
      return response.status(500).json({
        error: 'Erro ao remover desenvolvedor'
      });
    }

    return response.status(204).send();
  }
}

module.exports = new DeveloperController();
