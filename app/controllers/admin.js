var express = require("express");
var user_md =  require("../models/user")
var helper = require("../helpers/helper")

var router = express.Router();

router.get("/", function(req, res) {
    res.json({message: "this is admin page"})
})
router.get("/signup", function(req, res) {
    res.render("signup", {data: {}})
})
router.post("/signup", function(req, res) {
    var user = req.body;    

    if(user.email.trim().length === 0){
        res.render("signup", {data: {error: "Email is required!"} })
    }
    if(user.passwd != user.repasswd && user.passwd.trim().length != 0){
        res.render("signup", {data: {error: "Password is not match"}})
    }

    //insert db
    var hashed_passwd =  helper.hash_password(user.passwd); 
    user = {
        email: user.email,
        password: hashed_passwd,
        first_name: user.firstname,
        last_name: user.lastname
    }
    var result = user_md.addUser(user);
    result.then(function(data){
        res.json({message: "success"})
    }).catch(function(err){
            res.render("signup", {data: {error: "Could not insert data to db"}})
        }); 
})
module.exports = router;