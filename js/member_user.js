var token = localStorage.getItem("token");
var userId = 0;
var loginName = "";
var sex = 0;
var type = 0;

//密码正则
var pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/;
//真实姓名正则
var userNameReg = /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20})$/;
//身份证正则
var identityCodeReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
//Email正则
var emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
//手机号正则
var phoneReg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;

$(function (){
    $.ajax({
        url:"/easybuy/user/regist/userInfoByToken",
        type:"post",
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success:function(result){
            loginName = result.loginName;
            $("#modify_loginName").val(loginName);
            $("#modify_userName").val(result.userName);
            $("#modify_identityCode").val(result.identityCode);
            $("#modify_email").val(result.email);
            $("#modify_mobile").val(result.mobile);
            userId = result.id;
            sex = result.sex;
            type = result.type;
        }
    });

    $("#old_pwd").blur(function (){
        var pwd = $(this).val();
        oldpwd_v(pwd);
    })
    $("#new_pwd").blur(function (){
        var pwd = $(this).val();
        pwd_v(pwd);
    })
    $("#modify_userName").blur(function (){
        var userName = $(this).val();
        userName_v(userName);
    })
    $("#modify_identityCode").blur(function (){
        var identityCode = $(this).val();
        identityCode_v(identityCode);
    })
    $("#modify_email").blur(function (){
        var email = $(this).val();
        email_v(email);
    })
    $("#modify_mobile").blur(function (){
        var mobile = $(this).val();
        mobile_v(mobile);
    })

});

//修改用户
function modify_sub(){
    var oldPwd = $("#old_pwd").val();
    var newPwd = $("#new_pwd").val();
    var userName = $("#modify_userName").val();
    var identityCode = $("#modify_identityCode").val();
    var email = $("#modify_email").val();
    var mobile = $("#modify_mobile").val();
    if(oldpwd_v(oldPwd) && pwd_v(newPwd) && userName_v(userName) && identityCode_v(identityCode) && email_v(email) && mobile_v(mobile)){
        if (newPwd == ""){
            newPwd = null;
        }
        alert(newPwd);
        $.ajax({
            url:"/easybuy/user/regist/userModify",
            type:"post",
            data:{"id":userId,"userName":userName,"password":newPwd,"sex":sex,"identityCode":identityCode,"email":email,"mobile":mobile,"type":type},
            beforeSend:function (XMLHttpRequest){
                XMLHttpRequest.setRequestHeader("token",token);
            },
            success:function(result){
                if(result){
                    window.location.href = "/Member.html";
                }else {
                    alert("修改失败,请检查修改信息是否按要求填写。");
                }
            }
        })
    }else{
        alert("请按要求填写修改信息！");
    }
    return false;
}

//旧密码验证
function oldpwd_v(pwd){
    var flag = false;
    if (pwd == "" || pwd == null){
        $("#old_pwd").nextAll("span").hide();
        return true;
    }
    $.ajax({
        url:"/easybuy/user/tourist/login",
        type:"post",
        data:{"loginName":loginName,"password":pwd},
        async:false,
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success:function(result){
            flag = result.flag;
        }
    })

    if(flag){
        $("#old_pwd").nextAll("span").hide();
        return flag;
    }else {
        $("#old_pwd").nextAll("span").text("密码错误").show();
        return flag;
    }
}
//密码格式验证
function pwd_v(pwd){
    if(pwd == "" || pwd == null){
        $("#new_pwd").nextAll("span").hide();
        $("#old_font").text("");
        $("#old_pwd").removeAttr("required");
        return true;
    }else {
        $("#old_font").text("*");
        $("#old_pwd").attr("required","required");
    }

    if(!pwdReg.test(pwd)){
        $("#new_pwd").nextAll("span").text("密码格式不正确").show();
        return false;
    }

    $("#new_pwd").nextAll("span").hide();
    return true;
}

//真实姓名验证
function userName_v(userName){
    var flag = false;
    if(userName == "" || userName == null){
        $("#modify_userName").nextAll("span").hide();
        return flag;
    }
    if(!userNameReg.test(userName)){
        $("#modify_userName").nextAll("span").text("真实姓名格式不正确").show();
        return flag;
    }

    $("#modify_userName").nextAll("span").hide();
    return !flag;
}

//身份证号验证
function identityCode_v(identityCode){
    if(identityCode == "" || identityCode == null){
        $("#modify_identityCode").nextAll("span").hide();
        return true;
    }
    if(!identityCodeReg.test(identityCode)){
        $("#modify_identityCode").nextAll("span").text("身份证号格式不正确").show();
        return false;
    }

    $("#modify_identityCode").nextAll("span").hide();
    return true;
}

//邮箱验证
function email_v(email){
    if(email == "" || email == null){
        $("#modify_email").nextAll("span").hide();
        return true;
    }
    if(!emailReg.test(email)){
        $("#modify_email").nextAll("span").text("邮箱格式不正确").show();
        return false;
    }

    $("#modify_email").nextAll("span").hide();
    return true
}

//手机号验证
function mobile_v(mobile){
    if(mobile == "" || mobile == null){
        $("#modify_mobile").nextAll("span").hide();
        return true;
    }
    if(!phoneReg.test(mobile)){
        $("#modify_mobile").nextAll("span").text("手机号格式不正确").show();
        return false;
    }

    $("#modify_mobile").nextAll("span").hide();
    return true
}