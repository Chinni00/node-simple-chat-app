const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/chat", (req, res, next) => {
  // Read existing messages from 'data.txt'
  fs.readFile("data.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Display the form and existing messages
    const form = '<center><form action="/chat" method="POST"><input placeholder="enter message" name="msg"/><button type="submit">Send</button></form></center>';
    const messages = data ? `<div> ${data.split("\n").join("<br>")}</div>` : '';
    res.send(form + messages);
  });
});

router.post("/chat", (req, res, next) => {
  // Retrieve the value of the 'msg' field from the request body
  const msg = req.body.msg;
  let userName = '';

  // reading username from file
  try {
    userName = fs.readFileSync("username.txt", "utf8");
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
    return;
  }

  // Append the message to the 'data.txt' file with a newline
  fs.appendFile("data.txt", `${userName}:${msg}\n`, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Redirect to the /chat endpoint to display the updated messages
    res.redirect("/chat");
  });
});

module.exports = router;
