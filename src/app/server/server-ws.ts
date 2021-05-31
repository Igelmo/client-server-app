import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

interface ExtWebSocket extends WebSocket {
  isAlive: boolean;
}

wss.on('connection', (ws: WebSocket) => {

  const extWs = ws as ExtWebSocket;

  extWs.isAlive = true;

  ws.on('pong', () => {
    extWs.isAlive = true;
  });

  //connection is up, let's add a simple simple event
  ws.on('message', () => {

    setTimeout(() => {
        //send back the message to the other clients
        wss.clients
          .forEach(client => {
            if (client != ws) {
              client.send("I'm sending something to the client");
            }
          });

      ws.send("You sent -> I'm alive! Hello server");

    }, 1000);

  });

  //send immediatly a feedback to the incoming connection
  ws.send('Hi there, I am a WebSocket server');

  ws.on('error', (err) => {
    console.warn(`Client disconnected - reason: ${err}`);
  })
});

setInterval(() => {
  wss.clients.forEach((ws: WebSocket) => {

    const extWs = ws as ExtWebSocket;

    if (!extWs.isAlive) return ws.terminate();

    extWs.isAlive = false;
    ws.ping(null, undefined);
  });
}, 10000);

//start our server
server.listen(process.env.PORT || location.port, () => {
  console.log("Server started on port " + location.port + " :)");
});
