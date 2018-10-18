var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var path = require('path');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var mongoDB = "mongodb://localhost:27017/vinavdb";

app.set('trust proxy', 1);
app.use(session({
		secret: 'dsghbrtdfhbdfg64545TRYFFHGGJNN',
		resave: false,
		saveUninitialized: true
}))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/assets'));
app.set('views', path.join(__dirname,'admin'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


var sess;

mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, { useNewUrlParser: true });

var nameSchema = new mongoose.Schema({
	firstname : String,
	lastname : String,
	email : String,
	password : String
});
var User = mongoose.model("User", nameSchema);

app.get("/", (req,res) => {
	sess = req.session;
	if(sess.email){
		res.redirect("/admin");
	}else{
		res.sendFile(__dirname + "/index.html");
	}
	
});

app.get("/login", (req,res) => {
	sess = req.session;
	if(sess.email){
		res.redirect("/admin");
	}else{
		res.sendFile(__dirname + "/login.html");
	}
});
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
						//	 res.send("ThankYou For your Registration")
            		 }
            		 else if( resv.email == req.body.email){
	 						res.send("Email is already registered");
	 				}else{
	 						res.send("Srry data is not allowed");
					}
        	});
});
	app.post("/login", function(req, res, next) {
		User.findOne({ email:req.body.email},function(err, vals) {
            		 if(vals == null){							
							res.end("Invalid Logins");							
            		 }
            		 else if( vals.email == req.body.email && vals.password == req.body.password){
            		 	sess = req.session;
            		 	sess.email = req.body.email;
            		 	res.redirect('/admin');
	 				}else{
	 						res.send("Srry data is not allowed");
					}						
		});
	});

app.route('/admin')
    .get(function(req, res, next) {
    	 sess = req.session;
     if (sess.email) {  
         	 res.render("index");
        }else{
        	res.write('<h1>Please login first.</h1>');
       }
    })


	app.get("/logout", function(req, res){
		sess.destroy(function(err){
			if(err){
				 console.log(err);
			}else{
				  res.redirect('/');
			}
		});
	});

app.listen(port, () => {
	console.log("Server listening on port " + port);
});