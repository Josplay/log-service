const express = require("express");
const { MongoClient } = require("mongodb");
const generateV1 = require("./routes/v1");
const { mongoDatabaseName, mongoDatabaseUrl, port } = require("./config");
const http = require("http");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = new MongoClient(mongoDatabaseUrl);
client.connect();
const db = client.db(mongoDatabaseName);

app.use("/v1/", generateV1(db));

const server = http.createServer(app);

server.listen(port, () => console.log("Listening at port", server.address()));

// You can't upgrade to a more sophisticated method
// if you are feeling fancy, but this works right now.
server.on("error", console.error);

process.on("SIGTERM", () => {
  client.close();
  server.close();
});

process.on("SIGKILL", () => {
  client.close();
  server.close();
});
