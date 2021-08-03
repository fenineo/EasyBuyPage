//用户注册js

//用户名正则
var longinNameReg = /[a-zA-Z1-9]{1,16}$/;
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
    $("#loginName").blur(function (){
        loginName_v();
    })
    $("#pwd").blur(function (){
        pwd_v();
    })
    $("#verifyPwd").blur(function (){
        pwd_vs();
    })
    $("#userName").blur(function (){
        userName_v();
    })
    $("#identityCode").blur(function (){
        identityCode_v();
    })
    $("#email").blur(function (){
        email_v();
    })
    $("#mobile").blur(function (){
        mobile_v();
    })
});

function sub(){
    if(loginName_v() && pwd_v() && pwd_vs() && userName_v() && identityCode_v() && email_v() && mobile_v()){
        var loginName = $("#loginName").val();
        var password = $("#pwd").val();
        var userName = $("#userName").val();
        var sex = $("input:radio:checked").val();
        var identityCode = $("#identityCode").val();
        var email = $("#email").val();
        var mobile = $("#mobile").val();
        $.ajax({
            url:"/easybuy/user/tourist/register",
            type:"post",
            data:{"loginName":loginName,"password":password,"userName":userName,"sex":sex,"identityCode":identityCode,"email":email,"mobile":mobile},
            dataType:"JSON",
            success:function(result){
                if(result){
                    window.location.href = "/Login.html";
                }else {
                    alert("注册失败,请检查注册信息是否按要求填写。");
                }
            }
        })
    }else{
        alert("请按要求填写注册信息！");
    }
    return false;
}

// 用户名验证
function loginName_v(){
    var flag=false;
    var loginName = $("#loginName").val();
    if(loginName == "" || loginName == null){
        $("#loginName").nextAll("span").hide();
        return flag;
    }
    if (!longinNameReg.test(loginName)){
        $("#loginName").nextAll("span").text("用户名格式不正确").show();
    }else {
        $.ajax({
            url:"/easybuy/user/tourist/existLoginName",
            type:"post",
            data:{"loginName":loginName},
            dataType:"JSON",
            async:false,
            success:function(result){
                flag = result;
            }
        });
        if(flag){
            $("#loginName").nextAll("span").text("用户名已存在").show();
        }else{
            $("#loginName").nextAll("span").hide();
        }
    }
    return !flag;
}

//密码格式验证
function pwd_v(){
    var flag = false;
    var pwd = $("#pwd").val();
    if(pwd == "" || pwd == null){
        $("#pwd").nextAll("span").hide();
        return flag;
    }
    if(!pwdReg.test(pwd)){
        $("#pwd").nextAll("span").text("密码格式不正确").show();
        return flag;
    }

    $("#pwd").nextAll("span").hide();
    return !flag;
}

//再次输入密码验证
function pwd_vs(){
    var flag = false;
    var pwe_vif = $("#verifyPwd").val();
    if(pwe_vif == "" || pwe_vif == null){
        $("#verifyPwd").nextAll("span").hide();
        return flag;
    }
    var pwd = $("#pwd").val();
    if(pwe_vif != pwd){
        $("#verifyPwd").nextAll("span").text("两次输入的密码不一致").show();
        return flag;
    }

    $("#verifyPwd").nextAll("span").hide();
    return !flag;
}

//真实姓名验证
function userName_v(){
    var flag = false;
    var userName = $("#userName").val();
    if(userName == "" || userName == null){
        $("#userName").nextAll("span").hide();
        return flag;
    }
    if(!userNameReg.test(userName)){
        $("#userName").nextAll("span").text("真实姓名格式不正确").show();
        return flag;
    }

    $("#userName").nextAll("span").hide();
    return !flag;
}

//身份证号验证
function identityCode_v(){
    var identityCode = $("#identityCode").val();
    if(identityCode == "" || identityCode == null){
        $("#identityCode").nextAll("span").hide();
        return true;
    }
    if(!identityCodeReg.test(identityCode)){
        $("#identityCode").nextAll("span").text("身份证号格式不正确").show();
        return false;
    }

    $("#identityCode").nextAll("span").hide();
    return true;
}

//邮箱验证
function email_v(){
    var email = $("#email").val();
    if(email == "" || email == null){
        $("#email").nextAll("span").hide();
        return true;
    }
    if(!emailReg.test(email)){
        $("#email").nextAll("span").text("邮箱格式不正确").show();
        return false;
    }

    $("#email").nextAll("span").hide();
    return true
}

//手机号验证
function mobile_v(){
    var mobile = $("#mobile").val();
    if(mobile == "" || mobile == null){
        $("#mobile").nextAll("span").hide();
        return true;
    }
    if(!phoneReg.test(mobile)){
        $("#mobile").nextAll("span").text("手机号格式不正确").show();
        return false;
    }

    $("#mobile").nextAll("span").hide();
    return true
}