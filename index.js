
const express = require('express');
var app = express();
const router = require("./routes/router")

// mount the router on the app
app.use('/', router);

app.listen(8081, function () {   
   
});