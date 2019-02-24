var express = require("express");
const division = express();
var database = require("../Database/database");

division.get("/api/getDivision", function(req, res) {
  var appData = {};
  // console.log("yeyy");
  database.connection.query(
    "SELECT * from divisionmaster WHERE IsActive=1 and IsDelete=0",
    function(err, rows, fields) {
      //console.log(rows);
      if (!err) {
        // console.log("viraj");
        appData["error"] = 0;
        appData["data"] = rows;
        res.status(200).json(appData);
      } else {
        appData["data"] = "No data found";
        res.status(204).json(appData);
      }
    }
  );
});

division.post("/api/divisionInsertUpdate", function(req, res) {
  var appData = {
    error: 1,
    data: "",
    message: "",
    success: false
  };
  console.log(req.body);
  database.connection.query(
    "CALL sp_division_masterInsertUpdate (?, ?, ?, ?, ?, ?)",
    [
      req.body.Id,
      req.body.Division,
      req.body.IsActive,
      req.body.IsDelete,
      req.body.CreatedBy,
      req.body.UpdatedBy
    ],
    function(err, data, fields) {       
      //console.log(err);    
      if (!err) {
        req.body.Id = data[0]["LAST_INSERT_ID()"];
        appData["error"] = 0;
        appData["data"] = req.body;
        appData["success"] = true;
        appData["message"] = "Division data saved successfully.";
        res.status(201).json(appData);
      } else { 
        appData["error"] = 1;
        appData["data"] = err;
        appData["success"] = false;
        res.status(400).json(appData);
      }
    }
  );
});

division.post("/api/divisionMasterDelete", function(req, res) {
  var appData = {
    error: 1,
    data: "",
    message: "",
    success: false
  };
  database.connection.query(
    "CALL sp_division_masterDelete (?)",
    [req.body.Id],
    function(err,data,fields) {
      if (!err) {
        appData["error"] = 0;
        appData["data"] = req.body;
        appData["success"] = true;
        appData["message"] = "Division deleted successfully.";
        res.status(200).json(appData);
      } else {
        appData["error"] = 1;
        appData["data"] = err;
        appData["success"] = false;
        res.status(400).json(appData);
      }
    }
  );
});
  
module.exports = division;