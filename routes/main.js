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


module.exports = function(app) {
    app.get("/",function(req, res){
        res.render("index.ejs")
    });

    app.get("/about",function(req, res) {
        res.render("about.ejs");
    });

    app.get("/add",function(req, res) {
        console.error("get add page")
        res.render("add.ejs",  {status: ""});
    });

    app.post("/add",function(req, res) {

        console.error("req.body: ", req.body) // object
        console.error("req.json: ", req.json) // object
        console.log("Request type :", req.get('Content-Type'));
        var sql = "INSERT INTO devices (name, type, on_off, open_locked, open_closed, volume, temperature) VALUES ?";
        var values = [[req.body.name, req.body.type, req.body.on_off, req.body.open_locked, req.body.open_closed, parseInt(req.body.volume), parseInt(req.body.temperature)]]
        db.query(sql, [values], function (err, result) {
          console.error("result: ", result)
          if (err){
             res.render("add.ejs",  {status: "error"});
             console.error("Something went wrong: ", err)
          }
          console.log("1 record inserted");
          res.render("add.ejs",  {status: "ok"});
        });
    });

    
    app.get("/status", function(req, res) {
        // query database to get all the books
        let sqlquery = "SELECT name FROM devices";
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                console.error("err: ", err)
                res.render("status.ejs",  {status:"error"});
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
                res.render("status_sp.ejs",  {status:"error"});
            }
            else{
                console.log("devices result: ", result)
                res.render("status_sp",  {status:"ok", device: result[0]});
            }
        });
    });

}