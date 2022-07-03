// The index.js file of your application
const express = require ("express");
const app = express();
const port = 8086;

app.set("views",__dirname + "/views");
app.set("view engine", "ejs");

app.engine("html", require("ejs").renderFile);

app.use(express.static(__dirname + '/assets'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes/main")(app);
app.listen(port, () => console.log(`app listening on port ${port}!`));

