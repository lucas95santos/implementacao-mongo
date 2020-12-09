const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const server = express();
const PORT = 8080;

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
