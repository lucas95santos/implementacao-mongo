// model
const Developer = require('../models/Developer');

class ActionsController {
  async like(request, response) {
    const { developerId } = request.params;
    const { user } = request.headers;

    if (!user) {
      return response.status(404).json({ error: 'O id deve ser informado' });
    }

    const loggedDev = await Developer.findById(user);
    const targetDev = await Developer.findById(developerId);

    if (!targetDev) {
      return response.status(400).json({ error: 'Desenvolvedor não existe' });
    }

    if (!loggedDev.likes.includes(targetDev._id)) {
      loggedDev.likes.push(targetDev._id);
    } else {
      return response.status(400).json({ error: 'Você já curtiu o perfil deste usuário' });
    }

    await loggedDev.save();

    if (targetDev.likes.includes(loggedDev._id)) {
      console.log('DEU MATCH');
    }

    return response.json(loggedDev);
  }

  async dislike(request, response) {
    const { developerId } = request.params;
    const { user } = request.headers;

    if (!user) {
      return response.status(404).json({ error: 'O id deve ser informado' });
    }

    const loggedDev = await Developer.findById(user);
    const targetDev = await Developer.findById(developerId);

    if (!targetDev) {
      return response.status(400).json({ error: 'Desenvolvedor não existe' });
    }

    if (!loggedDev.dislikes.includes(targetDev._id)) {
      loggedDev.dislikes.push(targetDev._id);
    } else {
      return response.status(400).json({ error: 'Você já não curtiu o perfil deste usuário' });
    }

    await loggedDev.save();

    return response.json(loggedDev);
  }
}

module.exports = new ActionsController();
