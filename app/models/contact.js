var q = require("q")
var db = require("../common/database"); 
var conn = db.getConnection();
 
function addContact(params){
    if(params){
        var defer =  q.defer();

        var query = conn.query('INSERT INTO contact SET ?', params, function(err,result){
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

module.exports ={
    addContact
}