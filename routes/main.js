const mysql = require ("mysql");

const db = mysql.createConnection ({
    host: "localhost",
    user: "root",
    password: "test",
    database: "IOT"
   });

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected to database");
});
global.db = db;


TYPE_FIELDS_MAP = {
    "ac":["on_off",  "temperature"],
    "heating":["on_off","temperature"],
    "curtains":[ "open_closed"],
    "blinds":[ "open_closed"],
    "lights":["on_off"],
    "TV":["on_off", "volume"],
    "audio":["on_off", "volume"],
    "coffee":["on_off"],
    "lock":[ "open_locked"],
    "outlet":["on_off"],
}

ALL_TYPES = ["on_off", "open_closed", "open_locked","temperature", "volume"]

module.exports = function(app) {
    app.get("/",function(req, res){
        res.render("index.ejs")
    });

    app.get("/about",function(req, res) {
        res.render("about.ejs");
    });

    app.get("/add",function(req, res) {
        console.error("get add page")
        res.render("add.ejs",  {status: "", all_types: ALL_TYPES, type_fields_map: TYPE_FIELDS_MAP});
    });

    app.post("/add",function(req, res) {

        let types_to_store = TYPE_FIELDS_MAP[req.body.type]
        var sql = "INSERT INTO devices (name, type, "+ types_to_store.join(', ') +") VALUES ?";
        var values = [req.body.name, req.body.type]
        types_to_store.forEach(type => {
            let value = req.body[type]
            if(["volume", "temperature"].includes(type)){
                value = parseInt(value)
            }
            values.push(value)
        });
        db.query(sql, [[values]], function (err, result) {
          if (err){
             res.render("add.ejs",  {status: "error", all_types: ALL_TYPES, type_fields_map: TYPE_FIELDS_MAP});
             console.error("Something went wrong: ", err)
          }
          console.log("1 record inserted");
          res.render("add.ejs",  {status: "ok", all_types: ALL_TYPES, type_fields_map: TYPE_FIELDS_MAP});
        });
    });

    
    app.get("/status", function(req, res) {
        // query database to get all the books
        let sqlquery = "SELECT name FROM devices";
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                console.error("err: ", err)
                res.render("status.ejs",  {status:"error", devices: []});
            }
            else{
                console.log("devices result: ", result)
                res.render("status.ejs",  {status:"ok", devices: result});
            }
        });
    });

    app.get("/status_sp", function(req, res) {
        // query database to get all the books
        console.log("req.query: ", req.query)
        let sqlquery = "SELECT * FROM devices WHERE name = ?";
        // execute sql query
        db.query(sqlquery, req.query.name, (err, result) => {
            if (err) {
                console.error("err: ", err)
                res.render("status.ejs",  {status:"error", devices: []});
            }
            else{
                console.log("devices result: ", result)
                res.render("status_sp.ejs",  {status:"ok", device: result[0]});
            }
        });
    });

    app.get("/control", function(req, res) {
        // query database to get all the books
        let sqlquery = "SELECT name FROM devices";
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                console.error("err: ", err)
                res.render("control.ejs",  {status:"error", devices: []});
            }
            else{
                console.log("devices result: ", result)
                res.render("control.ejs",  {status:"ok", devices: result});
            }
        });
    });

    app.get("/control_sp", function(req, res) {
        // query database to get all the books
        console.log("control page req.query: ", req.query)
        let sqlquery = "SELECT * FROM devices WHERE name = ?";
        // execute sql query
        db.query(sqlquery, req.query.name, (err, result) => {
            if (err) {
                console.error("err: ", err)
                res.render("control.ejs",  {status:"error", devices: []});
            }
            else{
                console.log("devices result: ", result)
                res.render("control_sp.ejs",  {status:"", device: result[0]});
            }
        });
    });

    app.post("/control_sp",function(req, res) {

        console.log("req.body: ", req.body)
        var sql = `UPDATE devices set type='${req.body.type}', on_off='${req.body.on_off}', open_locked='${req.body.open_locked}', open_closed='${req.body.open_closed}', volume='${req.body.volume}', temperature='${req.body.temperature}' WHERE name='${req.body.name}'`;
        db.query(sql, function (err, result) {
          console.error("result: ", result)
          let sqlquery = "SELECT * FROM devices WHERE name = ?";
          db.query(sqlquery, req.body.name, (err, result) => {
                if (err) {
                    console.error("err: ", err)
                    res.render("control.ejs",  {status:"error", devices: []});
                }
                else{
                    console.log("devices result: ", result)
                    res.render("control_sp.ejs",  {status:"ok", device: result[0]});
                }
             });
        });
    });

    app.get("/delete", function(req, res) {
        let sqlquery = "SELECT name FROM devices";
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                console.error("err: ", err)
                res.render("delete.ejs",  {status:"error", devices: []});
            }
            else{
                console.log("devices result: ", result)
                res.render("delete.ejs",  {status:"", devices: result});
            }
        });
    });

    app.post("/delete",function(req, res) {

        console.log("req.query: ", req.body)
        var sql = `DELETE FROM devices WHERE name='${req.body.name}'`;
        db.query(sql, function (err, result) {
          console.error("result: ", result)
          let sqlquery = "SELECT name FROM devices";
          db.query(sqlquery, req.body.name, (err, result) => {
                if (err) {
                    console.error("err: ", err)
                    res.render("delete.ejs",  {status:"error", devices: []});
                }
                else{
                    console.log("devices result: ", result)
                    res.render("delete.ejs",  {status:"ok", devices: result});
                }
             });
        });
    });

}