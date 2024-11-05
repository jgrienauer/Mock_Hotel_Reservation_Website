const expr = require("express");
const app = expr();
const ejs = require("ejs");
const port = 3001;
const mysql = require("mysql");

app.use(expr.urlencoded());
app.use(expr.static("public"));
global.appRoot = __dirname;
app.set("view engine", "ejs");

var con = mysql.createConnection({
  host: "jacksongrienauer.lmu.build",
  user: "jacksong_jacksong",
  port: 3306,
  password: "Greenhou$e99",
  database: "jacksong_hotel_res",
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/", function (req, res) {
  const query = "SELECT Decription, Image_Url FROM Hotel JOIN Images USING(HotelID)";
  con.query(query, (error, result) => {
    if (error) throw error;
    res.render('homepage', { data: result });
  });
});


app.listen(port, function () {
  console.log("web server started on port " + port);
  console.log(appRoot);
});