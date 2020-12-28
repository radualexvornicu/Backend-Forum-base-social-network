const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var ESAPI = require('node-esapi');
const helmet = require("helmet");

const app = express();
app.use(ESAPI.middleware());
app.use(helmet());

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Server test ok" });
});

const db = require("./models");

/*
const Role = db.role;
const run = async () => {};
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  run();
  initial();
});
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}
*/
db.sequelize.sync();


require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require("./routes/categories.routes")(app);
require("./routes/topics.routes")(app);
require("./routes/posts.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});