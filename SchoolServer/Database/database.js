
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "virajdatabase",
  port:3307,
  database: "SmartSchool"
});

connection.connect(function(error) {
  if (!!error) {
    console.log("ERROR", error);
  } else {
    console.log("Connected");
  }
});

// connection.query("SELECT * FROM smartschool.standardmaster", function(
//   error,
//   rows,
//   field
// ) {
//   if (!!error) {
//     console.log("ERROR in Query", error);
//   } else {
//     console.log("Successful Query");
//   }
// });

// connection.end();  

module.exports.connection = connection;
