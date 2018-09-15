var express = require('express');
var mongoose = require('mongoose');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/vinavdb");

var nameSchema = new mongoose.Schema({
	firstname : String,
	lastname : String,
	email : String,
	password : String
});
var User = mongoose.model("User", nameSchema);

app.get("/", (req,res) => {
	res.sendFile(__dirname + "/index.html");
});

app.post("/addname",(req,res) => {
	 var myData = new User(req.body);
	 myData.save()
	 .then(item => {
	 		res.send("Name saved to database")
	 })
	 .catch(err => {
	 	 	res.status(400).send("Unable to save to database");
	 });
});


app.listen(port, () => {
	console.log("Server listening on port " + port);
});