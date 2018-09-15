var express = require('express');
var mongoose = require('mongoose');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var mongoDB = "mongodb://localhost:27017/vinavdb";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
mongoose.connect(mongoDB);

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

app.get("/login", (req,res) => {
	res.sendFile(__dirname + "/login.html");
});


/*********************** Start Registration *************************************/

app.post("/addname",function(req,res) {
	 var myData = new User(req.body);
	 User.findOne({ email:req.body.email},function(err, resv){
            		 if(resv == null){
            		 	 myData.save()
							 .then(item => {
							 		res.send("Name saved to database")
							 })
							 .catch(err => {
							 	 	res.status(400).send("Unable to save to database");
							 });
							 res.send("ThankYou For your Registration")
            		 }
            		 else if( resv.email == req.body.email){
	 						res.send("Email is already registered")

	 				}else{
	 						res.send("Srry data is not allowed");
					}
        	});
});

/*********************** End Registration *************************************/

	app.post("/demo", function(req,res) {
		User.findOne({ email:req.body.email},function(err, vals) {
            		 if(vals == null){							
							 		res.end("Invalid Logins");							
            		 }
            		 else if( vals.email == req.body.email && vals.password == req.body.password){
	 						res.send("Welcome to login Page")

	 				}else{
	 						res.send("Srry data is not allowed");
					}						
		});
	});






app.listen(port, () => {
	console.log("Server listening on port " + port);
});