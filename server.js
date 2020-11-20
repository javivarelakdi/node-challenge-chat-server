const express = require("express");
require("dotenv").config();
// const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
// app.use(cors());
app.use(bodyParser.json()); 
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const welcomeMessage = {
  id: 1,
  from: "Bart",
  text: "Welcome to CYF chat system!"
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages/:id", function (req, res) {
  const message = messages.filter(item => item.id === parseInt(req.params.id));
  res.send(message);
});

app.get("/messages", function (req, res) {
  res.send(messages);
});

app.post("/messages", urlencodedParser, function (req, res) {
  const newId = (messages[messages.length - 1].id) +1;
  const newMessage = {
    id: newId,
    from: req.body.from,
    text: req.body.text
  }
  messages.push(newMessage)
  res.send(messages);
});

app.delete("/messages/:id", function (req, res) {
  const index = messages.indexOf(messages.find(item => item.id === req.params.id));
  if (index > -1) {
    messages.splice(index, 1);
  }
  res.send(messages)
});

app.listen(process.env.PORT || 3000);
