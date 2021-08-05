var token = localStorage.getItem("token");

$(function (){
    $.ajax({
        url:"/easybuy/user/regist/userInfoByToken",
        type:"post",
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success:function(result){
            $("#loginName").text(result.loginName);
            if (result.type == 1){
                $("#type").text("管理员");
            }else {
                $("#type").text("注册用户");
            }
            $("#userId").text(result.id);
            if (result.mobile != ""){
                $("#mobile").text(result.mobile);
            }else {
                $("#mobile").text("未填写");
            }
            if (result.email != ""){
                $("#email").text(result.email);
            }else {
                $("#email").text("未填写");
            }
            if (result.identityCode != ""){
                $("#identityCode").text(result.identityCode);
            }else {
                $("#identityCode").text("未填写");
            }
        }
    });
});