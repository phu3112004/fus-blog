var express = require("express");
var router = express.Router();
var post_md = require("../models/post")
var contact_md = require("../models/contact")
const {htmlToText} = require("html-to-text"); 
var moment = require("moment");

router.get("/", function(req, res) {
    var page = 1;
    var limit = 5;
    var data = post_md.getAllPostsByLimitOffset(limit, page - 1);

    post_md.countPosts()
    .then(function(result) {
        var numberOfPosts = parseInt(result[0].count);
        var limitPage = Math.ceil(numberOfPosts / limit); 
        return data.then(function(posts) {
            posts.forEach(post => {
                post.content = htmlToText(post.content, {
                    wordwrap: true
                });
                if (post.content.length > 47) {
                    post.content = post.content.substring(0, 47) + "....";
                }
                post.updated_at = moment(post.updated_at).format('YYYY/MM/DD HH:mm');
            });
            var data = {
                posts: posts,
                limitPage: limitPage,
                page: page,
                error: false
            };
            res.render("blog/index", { data: data });
        });
    })
    .catch(function(err) {
        res.render("blog/index", { data: { error: "Cannot get number of posts data" } });
    });
})
router.get("/page/:page", function(req, res) {
    var page = parseInt(req.params.page);
    var limit = 5;
    var offset = limit*(page - 1);
    var data = post_md.getAllPostsByLimitOffset(limit, offset);

    post_md.countPosts()
    .then(function(result) {
        var numberOfPosts = parseInt(result[0].count);
        var limitPage = Math.ceil(numberOfPosts / limit); 
        return data.then(function(posts) {
            posts.forEach(post => {
                post.content = htmlToText(post.content, {
                    wordwrap: true
                });
                if (post.content.length > 47) {
                    post.content = post.content.substring(0, 47) + "....";
                }
                post.updated_at = moment(post.updated_at).format('YYYY/MM/DD HH:mm');
            });
            var data = {
                posts: posts,
                limitPage: limitPage,
                page: page,
                error: false
            };
            res.render("blog/index", { data: data });
        });
    })
    .catch(function(err) {
        res.render("blog/index", { data: { error: "Cannot get number of posts data" } });
    });
})

router.get("/post/:id", function(req, res){
    var params = req.params;
    var id = params.id;
    var data = post_md.getPostByID(id)
    data.then(function(posts){ 
        var data = {
            post: posts[0],
            error: false
        }
        res.render("blog/post", {data: data})
    }).catch(function(err){
        res.render("blog/post", {data: {error: "Cannot get posts datas"}})
    })
})
router.get("/about", function(req, res){
    res.render("blog/about", {data: {error: false}});
})
router.get("/contact", function(req, res){
    res.render("blog/contact", {data: {error: false}});
})

router.post("/contact", function(req, res){ 
    var params = req.body

    if (params.name.trim().length == 0){
        res.render("blog/contact", {data: {error: "Do not leave name blank!"}})
    }
    else if(params.email.trim().length == 0){
        res.render("blog/contact", {data: {error: "Do not leave email blank!"}})

    }
    else if(params.phone.trim().length == 0){
        res.render("blog/contact", {data: {error: "Do not leave phone number blank!"}})
    }
    else if(params.message.trim().length == 0){
        res.render("blog/contact", {data: {error: "Do not leave message blank!"}})
    }
    else{
        var now = new Date();
        params.created_at = now; 
    
        var data = contact_md.addContact(params);
        data.then(function(result){
            res.render("blog/contact", {data: {success: "Contact message has sended."}})
        }).catch(function(err){
            res.render("blog/contact", {data: {error: "Some errors happened. Please check again!"}})
        }); 
    }
    
})
module.exports = router;