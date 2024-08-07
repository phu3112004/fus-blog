var q = require("q")
var db = require("../common/database"); 
var conn = db.getConnection();

function getAllUsers(){
    
    var defer =  q.defer();

    var query = conn.query('SELECT * FROM users', function(err,result){
        if(err){
            defer.reject(err); 
        }
        else{
            defer.resolve(result);
        }
    })
    return defer.promise
}

function addUser(user){
    if(user){
        var defer =  q.defer();

        var query = conn.query('INSERT INTO users SET ?', user, function(err,result){
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

function getUserByEmail(email){
    if(email){
        var defer = q.defer();
        var query = conn.query("SELECT * FROM users WHERE ?", {email: email}, function(err,result){
            if(err){
                defer.reject(err); 
            }
            else{
                defer.resolve(result);
            }
        })

        return defer.promise
    }
     
    return false;
}

function updateUser(params){
    if(params){
        var defer =  q.defer();

        var query = conn.query('UPDATE users SET first_name = ?, last_name = ?, updated_at = ? WHERE id = ?', [params.first_name, params.last_name, new Date(), params.id], function(err, result){
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
    addUser,
    getUserByEmail,
    getAllUsers,
    updateUser
}