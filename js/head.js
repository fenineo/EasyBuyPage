$(function (){
    var token = localStorage.getItem("token");

    $.ajax({
        url:"/easybuy/user/loginInfo",
        type:"post",
        data:{"token":token},
        dataType:"JSON",
        success:function(result){
            if(result.flag){
                $("#loginName").text(result.loginName);
                $("#login_n").hide();
                $("#login_y").show();
            }else{
                $("#login_n").show();
                $("#login_y").hide();
            }
        }
    });

    $("#logout").click(function (){
        var flag = confirm("确认要退出吗？")
        if(flag){
            localStorage.removeItem("token");
            window.location.href = "Index.html";
        }
    });
});