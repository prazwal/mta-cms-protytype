var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var methodOverride = require("method-override");
var assert = require('assert');




var passport = require('passport');
var LocalStrategy = require('passport-local');

var flash = require('connect-flash');

app.use(methodOverride("_method"));

//import models
var Blog = require('./models/blog.js');
var User = require('./models/user.js');
var Product = require('./models/product.js');
var ProductCategory = require('./models/productCategory.js');

//import routes
var blogRoutes = require('./routes/blogs.js');
var indexRoutes = require('./routes/index.js');
var userRoutes = require('./routes/users.js');
var productRoutes = require('./routes/products.js');
var productCategoryRoutes = require('./routes/productCategories.js');

//var uploadImageRoutes = require('./routes/uploadimage.js');



//passport config
app.use(require("express-session")({
  secret: "adf32rkj32ljfdpf934jl2k4jfp9324",
  resave:false,
  saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


mongoose.connect("mongodb://localhost/mtadb");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(flash());
app.use(function(req,res, next){
    res.locals.currentUser= req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//use routes
app.use(indexRoutes);
//app.use(uploadImageRoutes);
app.use("/blogs",blogRoutes);
app.use("/users",userRoutes);
app.use("/products",productRoutes);
app.use("/productcategories",productCategoryRoutes);








app.listen(3000, function(){
  console.log("mta-cms-prototype server has started");
});
