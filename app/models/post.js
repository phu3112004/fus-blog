var q = require("q")
var db = require("../common/database"); 
var conn = db.getConnection();
 
function getAllPosts(){
    
    var defer =  q.defer();

    var query = conn.query('SELECT * FROM posts', function(err,result){
        if(err){
            defer.reject(err); 
        }
        else{
            defer.resolve(result);
        }
    })
    return defer.promise
}
function addPost(params){
    if(params){
        var defer =  q.defer();

        var query = conn.query('INSERT INTO posts SET ?', params, function(err,result){
            if(err){
                defer.reject(err); 
            }
            else{
                defer.resolve(result);
            }
        })
        return defer.promise
    }
    return false
}
function getPostByID(id){
    var defer =  q.defer();

    var query = conn.query('SELECT * FROM posts WHERE ?', {id: id}, function(err,result){
        if(err){
            defer.reject(err); 
        }
        else{
            defer.resolve(result);
        }
    })
    return defer.promise
}
function updatedPost(params){
    if(params){
        var defer =  q.defer();

        var query = conn.query('UPDATE posts SET title = ?, content = ?, author = ?,  updated_at = ? WHERE id = ?', [params.title, params.content, params.author, new Date(), params.id], function(err, result){
            if(err){
                defer.reject(err); 
            }
            else{
                defer.resolve(result);
            }
        })
        return defer.promise
    }
    else return false
}

function deletePost(id){
    if(id){
        var defer =  q.defer();

        var query = conn.query('DELETE FROM posts WHERE id = ?', [id], function(err, result){
            if(err){
                defer.reject(err); 
            }
            else{
                defer.resolve(result);
            }
        })
        return defer.promise
    }
    else return false
}
module.exports = {
    getAllPosts,
    addPost,
    getPostByID,
    updatedPost,
    deletePost
}