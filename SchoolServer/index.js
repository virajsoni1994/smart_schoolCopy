const express = require("express");
const app = express();
var cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var login = require("./Routes/login");
app.use('/login',login);

var division = require("./Routes/division");
app.use('/division',division);

var standard = require("./Routes/standard");
app.use('/standard',standard);

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log("App is running on port " + PORT);
});


