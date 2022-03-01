require("dotenv").config();
const express = require("express");
const generateV1 = require("./routes/v1");
const http = require("http");
const cors = require("cors");
const { connectDb, PORT } = require('./config');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = connectDb()

app.use("/v1/", generateV1(db));

const server = http.createServer(app);

server.listen(PORT, () => console.log("Listening at port", server.address()));

// You can upgrade to a more sophisticated method
// if you are feeling fancy, but this works right now.
server.on("error", console.error);
/* 
// It appears Node.js is no longer supporting the below POSIX events
// Application crashes on startup with node v16.*
// See https://stackoverflow.com/questions/16311347/node-script-throws-uv-signal-start-einval/22651666
process.on("SIGTERM", () => {
  client.close();
  server.close();
});

process.on("SIGKILL", () => {
  client.close();
  server.close();
});
 */