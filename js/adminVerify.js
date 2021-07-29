var token = localStorage.getItem("token");
var flag = false;
var typeLv = 0;

$(function (){
    //界面默认隐藏
    $(".m_left").hide();
    $(".m_right").hide();

    if(token == null){
        //没有登陆，踢回首页
        window.location.href = "Index.html";
    }

    $.ajax({
        url:"/easybuy/user/loginInfo",
        type:"post",
        data:{"token":token},
        dataType:"JSON",
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success:function(result){
            flag = result.flag;
            typeLv = result.type;

            if (flag){
                //管理员用户展示管理模块
                if (typeLv == 0){
                    //权限不够，踢回首页
                    window.location.href = "Index.html";
                }else {
                    $(".m_left").show();
                    $(".m_right").show();
                }
            }else {
                //没有登陆，踢回首页
                window.location.href = "Index.html";
            }

        }
    })
});