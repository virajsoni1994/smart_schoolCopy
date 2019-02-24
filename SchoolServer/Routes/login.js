var express = require("express");
const login = express();
var database = require("../Database/database");



login.post("/api/usersLogin", function(req, res) {
  console.log("yee");
  var appData = {};
  var username= req.body.Username;
  var password = req.body.Password;
  //console.log(req.body);
  //console.log(req.query);
  //console.log(username);
  //console.log(password);
  database.connection.query('SELECT * FROM users WHERE Username = ?',[username], function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    
    if(results.length >0){
      if(results[0].Password == password){
        console.log('The solution is: ', results);
        console.log("login successfull");
        appData["data"] = results;
        res.status(200).json(appData);
        // res.send({
        //   "results": results
        //     });
      }
      else{
        res.send({
          "code":204,
          "success":"Username and password does not match"
            });
      }
    }
    else{
      res.send({
        "code":204,
        "success":"Username does not exits"
          });
    }
  }
  });
});

module.exports = login;