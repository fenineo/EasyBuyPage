$(function (){
    var token = localStorage.getItem("token");

    if (token == null){
        $("#login_n").show();
        $("#login_y").hide();
    }else {
        $.ajax({
            url:"/easybuy/user/loginInfo",
            type:"post",
            data:{"token":token},
            dataType:"JSON",
            beforeSend:function (XMLHttpRequest){
                XMLHttpRequest.setRequestHeader("token",token);
            },
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
    }
    //为用户点击注销按钮绑定事件
    $("#logout").click(function (){
        var flag = confirm("确认要退出吗？")
        if(flag){
            //删除token信息
            localStorage.removeItem("token");
            window.location.href = "Index.html";
        }
    });
});