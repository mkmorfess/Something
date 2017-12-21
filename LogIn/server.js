var express = require("express");
var mysql = require("mysql");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");

var PORT = 3000;

var app = express();

var id;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "LoginInfo_db"
});





app.get("/", function(req, res){

	res.render("login");

})

app.get("/burgers/:id", function(req, res){

	req.params.id = id;
	console.log(req.params.id)
	res.render("burger");

})


app.post("/login", function(req, res){
	connection.query("SELECT * FROM users WHERE user = ?", [req.body.user], function(err, data){
		if (err) throw err;
		if (data.length === 0) {
			console.log("No username on file");
		}
		else {
			
			if (data[0].pass === req.body.pass) {
				id = data[0].id;
				console.log("working")
				res.redirect("/burgers/");
				
				
				// connection.query("SELECT * FROM userdata WHERE id = " + id, function(err, results){
					
				// if (err) throw err;
				// })
			}
			else {
				console.log("Wrong Username and Password.. Try Again")
			}
		}
	})
})

app.post("/create", function(req, res) {
	console.log(req.body.user);
	console.log(req.body.pass);
	var sqlState = "INSERT INTO users (user, pass) VALUES ('" + req.body.user + "', '" + req.body.pass + "')";
	
	connection.query("SELECT * FROM users WHERE user = ?", [req.body.user], function(err, data){
		if (data.length > 0) {
			console.log("That username is already taken! Try again")
		}
		else {
			connection.query(sqlState, function(err, data) {
				if (err) throw err;
				console.log(data);
	})
		}
	})
})

// app.post("/burger", function(req, res) {
// 	connection.query("INSERT INTO userdata (userid, burger_name) VALUES (" + id + ", ?)", function(err, data) {

// 	})
// })


app.listen(PORT, function(){
	console.log("Server Running")
})

