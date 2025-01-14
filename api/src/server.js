const express = require('express');
const app = express();
const http = require('http');
const routes = require('./routes');
const cors = require('cors');
const { initializeWebSocket } = require('./websocket');
const port = 3000;

app.use(express.json());
app.use(cors())
app.use("/", routes)

const server = http.createServer(app);
initializeWebSocket(server);

server.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

