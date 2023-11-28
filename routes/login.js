const express = require("express");
const router = express.Router();
const fs = require('fs');

// Add middleware to parse the request body
router.use(express.urlencoded({ extended: true }));

router.get("/login", (req, res, next) => {
  res.send(
    '<form action="/login" method="POST" ><input placeholder="enter username" name="userName" /><button type="submit">Login</button></form>'
  );
});

router.post('/login', (req, res, next) => {
    // Access the parsed body
    const userName = req.body.userName;

    // Use fs.writeFile with a callback
    fs.writeFile('username.txt', userName, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/chat');
        }
    });
});

module.exports = router;
