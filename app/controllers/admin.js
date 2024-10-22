var express = require("express");
var user_md = require("../models/user");
var post_md = require("../models/post");
var helper = require("../helpers/helper");

var router = express.Router();

router.get("/", function(req, res) {
    if (!req.session.user) {
        res.redirect("/admin/login");
    } else {
        var data = post_md.getAllPostsByUserID(req.session.user.id);
        data.then(function(posts) {
            var data = {
                posts: posts,
                error: false
            };
            res.render("admin/dashboard", { data: data });
        }).catch(function(err) {
            res.render("admin/dashboard", { data: { error: "Cannot get posts data" } });
        });
    }
});

router.get("/post", function(req, res) {
    if (!req.session.user) {
        res.redirect("/admin/login");
    } else {
        res.redirect("/admin");
    }
});

router.get("/signup", function(req, res) {
    res.render("signup", { data: {} });
});

router.post("/signup", function(req, res) {
    var user = req.body;

    if (user.email.trim().length === 0) {
        res.render("signup", { data: { error: "Email is required!" } });
    } else if (user.passwd != user.repasswd && user.passwd.trim().length != 0) {
        res.render("signup", { data: { error: "Password does not match" } });
    } else {
        // Check if email already exists
        var existingUser = user_md.getUserByEmail(user.email);
        existingUser.then(function(users) {
            if (users.length > 0) {
                res.render("signup", { data: { error: "Email already exists!" } });
            } else {
                // Insert into db
                var hashed_passwd = helper.hash_password(user.passwd);
                var now = new Date();
                user = {
                    email: user.email,
                    password: hashed_passwd,
                    first_name: user.firstname,
                    last_name: user.lastname,
                    created_at: now,
                    updated_at: now
                };
                var result = user_md.addUser(user);
                result.then(function(data) {
                    res.redirect("/admin/login");
                }).catch(function(err) {
                    res.render("signup", { data: { error: "Could not sign up, some errors happened." } });
                });
            }
        }).catch(function(err) {
            res.render("signup", { data: { error: "Error checking existing email." } });
        });
    }
});


router.get("/login", function(req, res) {
    res.render("login", { data: {} });
});

router.post("/login", function(req, res) {
    var param = req.body;

    if (param.email.trim().length === 0) {
        res.render("login", { data: { error: "Please enter email." } });
    } else {
        var data = user_md.getUserByEmail(param.email);

        if (data) {
            data.then(function(users) {
                var user = users[0];

                var status = helper.compare_password(param.password, user.password);

                if (!status) {
                    res.render("login", { data: { error: "Password is not correct!" } });
                } else {
                    req.session.user = user;
                    res.redirect("/admin/");
                }
            });
        } else {
            res.render("login", { data: { error: "User does not exist" } });
        }
    }
});

router.get("/post/new", function(req, res) {
    if (!req.session.user) {
        res.redirect("/admin/login");
    } else {
        res.render("admin/post/new", { data: { error: false } });
    }
});

router.post("/post/new", function(req, res) {
    if (!req.session.user) {
        res.redirect("/admin/login");
    } else {
        var params = req.body;

        if (params.title.trim().length == 0) {
            res.render("admin/post/new", { data: { error: "Do not leave title blank!" } });
        } else if (params.content.trim().length == 0) {
            res.render("admin/post/new", { data: { error: "Do not leave content blank!" } });
        } else {
            var now = new Date();
            params.created_at = now;
            params.updated_at = now;
            params.user_id = req.session.user.id;
            params.author = req.session.user.last_name + " " + req.session.user.first_name;
            var data = post_md.addPost(params);
            data.then(function(result) {
                res.redirect("/admin");
            }).catch(function(err) {
                res.render("admin/post/new", { data: { error: "Could not insert data to database" } });
            });
        }
    }
});

router.get("/post/edit/:id", function(req, res) {
    if (!req.session.user) {
        res.redirect("/admin/login");
    } else {
        var params = req.params;
        var id = params.id;
        var data = post_md.getPostByID(id);
        if (data) {
            data.then(function(posts) {
                var post = posts[0];
                var data = {
                    post: post,
                    error: false
                };
                res.render("admin/post/edit", { data: data });
            }).catch(function(error) {
                var data = { error: "Cannot find post" };
                res.render("admin/post/edit", { data: data });
            });
        } else {
            res.render("admin/post/edit", { data: { error: "Cannot find the post by id" } });
        }
    }
});

router.put("/post/edit", function(req, res) {
    if (!req.session.user) {
        res.json({ status_code: 401, error: "Unauthorized" });
    } else {
        var params = req.body;
        var data = post_md.updatedPost(params);

        if (data) {
            data.then(function(result) {
                res.json({ status_code: 200 });
            }).catch(function(err) {
                res.json({ status_code: 500 });
            });
        } else {
            res.json({ status_code: 500 });
        }
    }
});

router.delete("/post/delete", function(req, res) {
    if (!req.session.user) {
        res.json({ status_code: 401, error: "Unauthorized" });
    } else {
        var post_id = req.body.id;
        var data = post_md.deletePost(post_id);
        if (data) {
            data.then(function(result) {
                res.json({ status_code: 200 });
            }).catch(function(err) {
                res.json({ status_code: 500 });
            });
        } else {
            res.json({ status_code: 500 });
        }
    }
});

router.get("/user", function(req, res) {
    if (!req.session.user) {
        res.redirect("/admin/login");
    } else {
        var data = user_md.getAllUsers();
        data.then(function(users) {
            var data = {
                users: users,
                error: false
            };
            res.render("admin/user", { data: data });
        }).catch(function(err) {
            res.render("admin/user", { data: { error: "Cannot get users data" } });
        });
    }
});

router.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
        if (err) {
            res.negotiate(err);
        } else {
            res.redirect("/admin/login");
        }
    });
});

router.get("/profile", function(req, res) {
    if (!req.session.user) {
        res.redirect("/admin/login");
    } else { 
        var email = req.session.user.email; 
        var data = user_md.getUserByEmail(email)
        if (data) {
            data.then(function(users) {
                var user = users[0];
                var data = {
                    user: user,
                    error: false
                };
                res.render("admin/profile", { data: data });
            }).catch(function(error) {
                var data = { error: "Cannot find user" };
                res.render("admin/profile", { data: data });
            });
        } else {
            res.render("admin/profile", { data: { error: "Cannot find user" } });
        }
    }
});

router.put("/profile", function(req, res) {
    if (!req.session.user) {
        res.json({ status_code: 401, error: "Unauthorized" });
    } else {
        var params = req.body;
        var data = user_md.updateUser(params);

        if (data) {
            data.then(function(result) {
                res.json({ status_code: 200 });
            }).catch(function(err) {
                res.json({ status_code: 500 });
            });
        } else {
            res.json({ status_code: 500 });
        }
    }
});

module.exports = router;
