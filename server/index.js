const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs")
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const http = require('http');
const server = http.createServer(app);
const port = 3000;
const WebSocket=require("ws")
const wss = new WebSocket.Server({ server })
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
wss.on('connection', (ws) => {
  console.log('a user connected');
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });

  });
  ws.on('disconnect', () => {
    console.log('user disconnected');
  });
});
/**
 * This array will represent your database.
 * @type {Array<{name: string, email: string, age: number}>}
 */
const data = require("../data/data.json")
app.use(express.static(path.join(__dirname, "../client")));
// HINT: body-parser needed?
app.get("/api/users", (req, res) => {
  res.json(data);
});
app.post("/api/register", (req, res) => {
  const { name, email, age } = req.body;
  data.push({name,email,age})
  const jsonString = JSON.stringify(data, null, 2); // The third parameter (2) specifies the indentation level
  // Write the JSON string to a file
  fs.writeFileSync('./data/data.json', jsonString);
  // Send a response back to the client
  res.status(201).json({
    message: "User registered successfully",
    user: { name, email, age },
  });
});
server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});