const express = require('express');
const port = process.env.PORT || 3001;

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('<h1>get it</h1>');
})

server.listen(port, () => console.log(`The server is listening on port ${port}`));