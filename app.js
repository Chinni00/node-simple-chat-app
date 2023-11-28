const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const login = require('./routes/login')
const chatBox = require('./routes/chatBox');

app.use(bodyParser.urlencoded({extended:true}))

app.use(login)
app.use(chatBox);
app.use((req,res,next)=>{
    res.send('<center><h1>Page not found</h1></center>')
})

app.listen(3000)