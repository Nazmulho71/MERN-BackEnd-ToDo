const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const todos = require("./routes/todos");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Successfully connected to the database."))
  .catch(() => console.log("Cannot connect to the database."));

app.use(express.json());
app.use(cors());
app.use("/api/todos", todos);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const port = process.env.PORT || 8000;
const server = app.listen(port, () =>
  console.log(`Server is listening on port ${port}...`)
);

module.exports = server;
