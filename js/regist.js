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
    if(loginName_v() && pwd_v() && pwd_vs() && identityCode_v() && email_v() && mobile_v()){
        var loginName = $("#loginName").val();
        var password = $("#pwd").val();
        var userName = $("#userName").val();
        var sex = $("input:radio:checked").val();
        var identityCode = $("#identityCode").val();
        var email = $("#email").val();
        var mobile = $("#mobile").val();
        $.ajax({
            url:"/easybuy/user/register",
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
    $.ajax({
        url:"/easybuy/user/existLoginName",
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
    return !flag;
}

//密码格式验证
function pwd_v(){
    var pwd = $("#pwd").val();
    var pwdReg = /^\d{6}$/;
    if(!pwdReg.test(pwd)){
        $("#pwd").nextAll("span").text("密码必须为6位整数").show();
        return false;
    }

    $("#pwd").nextAll("span").hide();
    return true;
}

//再次输入密码验证
function pwd_vs(){
    var pwe_vif = $("#verifyPwd").val();
    var pwd = $("#pwd").val();
    if(pwe_vif != pwd){
        $("#verifyPwd").nextAll("span").text("两次输入的密码不一致").show();
        return false;
    }

    $("#verifyPwd").nextAll("span").hide();
    return true;
}

//身份证号验证
function identityCode_v(){
    var identityCode = $("#identityCode").val();
    var numReg = /^\d{18}$/;
    if(!numReg.test(identityCode)){
        if(identityCode == "" || identityCode == null){
            $("#identityCode").nextAll("span").hide();
            return true;
        }
        $("#identityCode").nextAll("span").text("身份证号必须为18位整数").show();
        return false;
    }

    $("#identityCode").nextAll("span").hide();
    return true;
}

//邮箱验证
function email_v(){
    var email = $("#email").val();
    var emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    if(!emailReg.test(email)){
        if(email == "" || email == null){
            $("#email").nextAll("span").hide();
            return true;
        }
        $("#email").nextAll("span").text("邮箱格式不正确").show();
        return false;
    }

    $("#email").nextAll("span").hide();
    return true
}

//手机号验证
function mobile_v(){
    var mobile = $("#mobile").val();
    var telReg = /^\d{11}$/;
    if(!telReg.test(mobile)){
        if(mobile == "" || mobile == null){
            $("#mobile").nextAll("span").hide();
            return true;
        }
        $("#mobile").nextAll("span").text("手机号必须为11位").show();
        return false;
    }

    $("#mobile").nextAll("span").hide();
    return true
}

//格式验证通用方法  obj：当前input对象 reg:正则表达式 remind:提醒语句
// function verify(obj,reg,remind){
//     var parm = $(obj).val();
//     if(!reg.test(parm)){
//         if(parm == "" || parm == null){
//             $(obj).nextAll("span").hide();
//             return true;
//         }
//         $(obj).nextAll("span").text(remind).show();
//         return false;
//     }
//
//     $(obj).nextAll("span").hide();
//     return true;
// }