const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');
const server = express();
const PORT = 8080;

// conexão com o MongoDB
mongoose.connect('mongodb+srv://lucas_santos:l08a04s95@implementacao-mongo.zxpo5.mongodb.net/db_implementacao?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
