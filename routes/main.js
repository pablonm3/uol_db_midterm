// The main.js file of your application
module.exports = function(app) {
    app.get("/",function(req, res){
        res.render("index.ejs")
    });

    app.get("/about",function(req, res) {
        res.render("about.ejs");
    });

    app.get("/add",function(req, res) {
        res.render("add.ejs");
    });

    app.post("/add",function(req, res) {
        console.log("req.body: ", req.body) // object

    });
}