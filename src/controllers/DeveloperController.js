const axios = require('axios');
// model
const Developer = require('../models/Developer');

class DeveloperController {
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
}

module.exports = new DeveloperController();
