function sub(){
    var loginName = $("#loginName").val();
    var password = $("#password").val();
    $.ajax({
        url:"/easybuy/user/tourist/login",
        type:"post",
        data:{"loginName":loginName,"password":password},
        dataType:"JSON",
        success:function(result){
            if(result.flag){
                localStorage.setItem("token",result.token);
                window.location.href = "Index.html";
            }else {
                $("#prompt").text(result.prompt).show();
            }
        }
    });
    return false;
}