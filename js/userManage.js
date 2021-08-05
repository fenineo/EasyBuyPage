var token = localStorage.getItem("token");
var pgIndex = 0;    //当前页码
var list = null;    //分页查询到的用户集合
var index = 0;      //当前被操作tr元素的索引

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
    //页面加载展示第一页
    userList(1);

    //数据验证
    $("#add_loginName").blur(function (){
        var loginName = $(this).val();
        loginName_v(loginName);
    })
    $(".pwd").blur(function (){
        var pwd = $(this).val();
        pwd_v(pwd);
    })
    $(".userName").blur(function (){
        var userName = $(this).val();
        userName_v(userName);
    })
    $(".identityCode").blur(function (){
        var identityCode = $(this).val();
        identityCode_v(identityCode);
    })
    $(".email").blur(function (){
        var email = $(this).val();
        email_v(email);
    })
    $(".mobile").blur(function (){
        var mobile = $(this).val();
        mobile_v(mobile);
    })

    //用户添加按钮点击事件
    $("#add_user").click(function (){
        $("#right_head").nextAll().hide();
        $("#return").show();
        $("#add_box").show();
    })
    //返回按钮点击事件
    $(".backPage").click(function (){
        $("#right_head").nextAll().show();
        $("#add_box").hide();
        $("#modify_box").hide();
    });
});

//查询用户集合
function userList(pageIndex){
    $.ajax({
        url:"/easybuy/user/admin/userList",
        type:"post",
        data:{"pageIndex":pageIndex},
        dataType:"JSON",
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success:function(result){
            pgIndex = result.userPage.pageIndex;
            list = result.userPage.list;
            var loginName = result.loginName;

            var userTable = "";
            if(loginName == "admin"){
                //操作人为超级管理员时用户列表拼接
                for(var i = 0;i < list.length;i++){
                    userTable +=
                        "<tr>"+
                        "   <td>"+list[i].loginName+"</td>"+
                        "   <td>"+list[i].userName+"</td>"+
                        "   <td>"+(list[i].sex == 1 ? "男":"女")+"</td>"+
                        "   <td>"+(list[i].type == 1 ? "管理员":"用户")+"</td>"+
                        "   <td><a class=\"modify_td\">修改</a></td>";
                    if(list[i].loginName == "admin"){
                        userTable +=
                            "   <td></td>";
                    }else {
                        userTable +=
                            "   <td><a class=\"remove_td\">删除</a></td>";
                    }
                }
            }else {
                //操作人为普通管理员时用户列表拼接
                for(var i = 0;i < list.length;i++){
                    userTable +=
                        "<tr>"+
                        "   <td>"+list[i].loginName+"</td>"+
                        "   <td>"+list[i].userName+"</td>"+
                        "   <td>"+(list[i].sex == 1 ? "男":"女")+"</td>"+
                        "   <td>"+(list[i].type == 1 ? "管理员":"用户")+"</td>";
                    if(list[i].type == 1){
                        userTable +=
                            "   <td></td>"+
                            "   <td></td>";
                    }else {
                        userTable +=
                            "   <td><a class=\"modify_td\">修改</a></td>"+
                            "   <td><a class=\"remove_td\">删除</a></td>";
                    }
                }
            }
            $("#first_tr").after(userTable);

            //引用pageBean.js的分页框展示方法
            pageShow(result.userPage);

            //动态绑定修改事件
            $(".modify_td").on("click",function (){
                $("#right_head").nextAll().hide();
                $("#modify_box").show();
                //获取当前操作的tr元素索引
                index = $(this).parent().parent().index() - 1;
                $("#modify_loginName").val(list[index].loginName);
                $("#modify_userName").val(list[index].userName);
                $("#modify_identityCode").val(list[index].identityCode);
                $("#modify_email").val(list[index].email);
                $("#modify_mobile").val(list[index].mobile);
                $("#modify_type").val(list[index].type);
            });
            //动态绑定删除事件
            $(".remove_td").on("click",function (){
                index = $(this).parent().parent().index() - 1;
                var flag = confirm("确认要删除用户\""+list[index].loginName+"\"吗？")
                if(flag){
                    removeUser(list[index].id);
                }
            })

        }
    });
}

//分页
function page(pageIndex){
    if(pageIndex != pgIndex){
        $("#first_tr").nextAll("tr").remove();
        $("#pageBox").empty();
        userList(pageIndex);
    }
}

//添加用户
function add_sub(){
    var loginName = $("#add_loginName").val();
    var password = $("#add_pwd").val();
    var userName = $("#add_userName").val();
    var sex = $("input:radio:checked").val();
    var identityCode = $("#add_identityCode").val();
    var email = $("#add_email").val();
    var mobile = $("#add_mobile").val();
    var type = $("#add_type").val();
    if(loginName_v(loginName) && pwd_v(password) && userName_v(userName) && identityCode_v(identityCode) && email_v(email) && mobile_v(mobile)){
        $.ajax({
            url:"/easybuy/user/admin/userAdd",
            type:"post",
            data:{"loginName":loginName,"password":password,"userName":userName,"sex":sex,"identityCode":identityCode,"email":email,"mobile":mobile,"type":type},
            beforeSend:function (XMLHttpRequest){
                XMLHttpRequest.setRequestHeader("token",token);
            },
            success:function(result){
                if(result){
                    window.location.href = "/Member_Links.html";
                }else {
                    alert("添加失败,请检查添加信息是否按要求填写。");
                }
            }
        })
    }else{
        alert("请按要求填写添加信息！");
    }
    return false;
}

//修改用户
function modify_sub(){
    var userName = $("#modify_userName").val();
    var identityCode = $("#modify_identityCode").val();
    var email = $("#modify_email").val();
    var mobile = $("#modify_mobile").val();
    var type = $("#modify_type").val();
    if(userName_v(userName) && identityCode_v(identityCode) && email_v(email) && mobile_v(mobile)){
        $.ajax({
            url:"/easybuy/user/regist/userModify",
            type:"post",
            data:{"id":list[index].id,"userName":userName,"sex":list[index].sex,"identityCode":identityCode,"email":email,"mobile":mobile,"type":type},
            beforeSend:function (XMLHttpRequest){
                XMLHttpRequest.setRequestHeader("token",token);
            },
            success:function(result){
                if(result){
                    window.location.href = "/Member_Links.html";
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

//删除用户
function removeUser(id){
    var loginName = $("#modify_loginName").val();
    $.ajax({
        url:"/easybuy/user/admin/userRemove",
        type:"post",
        data:{"id":list[index].id},
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success:function(result){
            if(result){
                window.location.href = "/Member_Links.html";
            }else {
                alert("删除失败");
            }
        }
    })
    return false;
}

// 用户名验证
function loginName_v(loginName){
    var flag = false;
    if(loginName == "" || loginName == null){
        $("#add_loginName").nextAll("span").hide();
        return flag;
    }
    if (!longinNameReg.test(loginName)){
        $("#add_loginName").nextAll("span").text("用户名格式不正确").show();
        return flag;
    }
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
        $("#add_loginName").nextAll("span").text("用户名已存在").show();
    }else{
        $("#add_loginName").nextAll("span").hide();
    }
    return !flag;
}

//密码格式验证
function pwd_v(pwd){
    if(pwd == "" || pwd == null){
        $(".pwd").nextAll("span").hide();
        return false;
    }
    if(!pwdReg.test(pwd)){
        $(".pwd").nextAll("span").text("密码格式不正确").show();
        return false;
    }

    $(".pwd").nextAll("span").hide();
    return true;
}

//真实姓名验证
function userName_v(userName){
    var flag = false;
    if(userName == "" || userName == null){
        $(".userName").nextAll("span").hide();
        return flag;
    }
    if(!userNameReg.test(userName)){
        $(".userName").nextAll("span").text("真实姓名格式不正确").show();
        return flag;
    }

    $(".userName").nextAll("span").hide();
    return !flag;
}

//身份证号验证
function identityCode_v(identityCode){
    if(identityCode == "" || identityCode == null){
        $(".identityCode").nextAll("span").hide();
        return true;
    }
    if(!identityCodeReg.test(identityCode)){
        $(".identityCode").nextAll("span").text("身份证号格式不正确").show();
        return false;
    }

    $(".identityCode").nextAll("span").hide();
    return true;
}

//邮箱验证
function email_v(email){
    if(email == "" || email == null){
        $(".email").nextAll("span").hide();
        return true;
    }
    if(!emailReg.test(email)){
        $(".email").nextAll("span").text("邮箱格式不正确").show();
        return false;
    }

    $(".email").nextAll("span").hide();
    return true
}

//手机号验证
function mobile_v(mobile){
    if(mobile == "" || mobile == null){
        $(".mobile").nextAll("span").hide();
        return true;
    }
    if(!phoneReg.test(mobile)){
        $(".mobile").nextAll("span").text("手机号格式不正确").show();
        return false;
    }

    $(".mobile").nextAll("span").hide();
    return true
}