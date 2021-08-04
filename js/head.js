$(function (){
    var token = localStorage.getItem("token");

    //判断token信息是否为空，不为空则表示用户已经登陆
    if (token == null){
        //展示登陆提示，隐藏用户工具栏
        $("#login_n").show();
        $("#login_y").hide();
        $("#collect").hide();
    }else {
        //用token请求用户信息
        $.ajax({
            url:"/easybuy/user/loginInfo",
            type:"post",
            beforeSend:function (XMLHttpRequest){
                XMLHttpRequest.setRequestHeader("token",token);
            },
            success:function(result){
                if(result.flag){
                    //返回true，登陆信息正确，隐藏登陆提示，展示用户工具栏
                    $("#loginName").text(result.loginName);
                    $("#login_n").hide();
                    $("#login_y").show();
                    $("#collect").show();
                }else{
                    //返回false，登陆信息错误，展示登陆提示，隐藏用户工具栏
                    $("#login_n").show();
                    $("#login_y").hide();
                    $("#collect").hide();
                }
            }
        });
    }
    //为用户点击注销按钮绑定事件
    $("#logout").click(function (){
        var flag = confirm("确认要退出吗？")
        if(flag){
            //删除本地token信息
            localStorage.removeItem("token");
            window.location.href = "Index.html";
        }
    });
});