function User(){ 
    function bindEvent(){
        $("#btn-save").click(function(e){  
            var params = {
                id: $(".id").val(), 
                first_name: $(".firstName").val(),
                last_name: $(".lastName").val(),   
            } 
            var base_url = location.protocol + "//" + document.domain + ":" + location.port;
            $.ajax({
                url: base_url + "/admin/profile",
                type: "put",
                data: params,
                dataType: "json",
                success: function(res){
                    if(res && res.status_code == 200){
                        location.reload();
                    }
                }
            })
        })
    }
    bindEvent();
}

$(document).ready(function(){
    new User();
})
