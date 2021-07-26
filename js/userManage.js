var token = localStorage.getItem("token");
var pgIndex = 0;//当前页码
var pageCount = 0;//总页数
var list = null;
var index = 0;

$(function (){
    userList(1);

    $(".loginName").blur(function (){
        var loginName = $(this).val();
        var idName = $(this).attr("id");
        if(idName == "modify_loginName"){
            if(loginName == list[index].loginName){
                return false;
            }
        }
        loginName_v(loginName);
    })
    $(".pwd").blur(function (){
        var pwd = $(this).val();
        pwd_v(pwd);
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

    $("#add_user").click(function (){
        $("#right_head").nextAll().hide();
        $("#add_box").show();
    })

});

//查询用户集合
function userList(pageIndex){
    $.ajax({
        url:"/easybuy/user/userList",
        type:"post",
        data:{"pageIndex":pageIndex},
        dataType:"JSON",
        success:function(result){
            pageCount = result.pageCount;
            pgIndex = result.pageIndex;
            list = result.list;

            //用户列表拼接
            var userTable = "";
            for(var i = 0;i < list.length;i++){
                if(list[i].loginName)
                userTable +=
                "<tr>"+
                "   <td>"+list[i].loginName+"</td>"+
                "   <td>"+list[i].userName+"</td>"+
                "   <td>"+(list[i].sex == 1 ? "男":"女")+"</td>"+
                "   <td>"+(list[i].type == 1 ? "管理员":"用户")+"</td>"+
                "   <td><a class=\"modify_td\">修改</a></td>"+
                "   <td><a class=\"remove_td\">删除</a></td>"+
                "</tr>"
            }
            $("#first_tr").after(userTable);

            //分页框拼接
            var pageBox = "<div class=\"page\" onclick=\"page(1)\">首页</div>";
            if(result.pageIndex>1){
                pageBox += "<div class=\"page\" onclick=\"page("+(result.pageIndex-1)+")\">上一页</div>";
            }
            if(pageCount>5 && pageIndex>2){
                for(var i = pageIndex-2;i<pageIndex+3;i++){
                    if(i==pageIndex){
                        pageBox += "<div class=\"page_ck\" onclick=\"page("+i+")\">"+i+"</div>";
                    }else{
                        pageBox += "<div class=\"page\" onclick=\"page("+i+")\">"+i+"</div>";
                    }
                }
            }else{
                for(var i = 1;i<=pageCount;i++){
                    if(i==pageIndex){
                        pageBox += "<div class=\"page_ck\" onclick=\"page("+i+")\">"+i+"</div>";
                    }else{
                        pageBox += "<div class=\"page\" onclick=\"page("+i+")\">"+i+"</div>";
                    }
                }
            }
            if(result.pageIndex<pageCount){
                pageBox += "<div class=\"page\" onclick=\"page("+(result.pageIndex+1)+")\">下一页</div>";
            }
            pageBox += "<div class=\"page\" onclick=\"page("+pageCount+")\">尾页</div>";
            $("#pageBox").append(pageBox);
            //动态绑定修改事件
            $(".modify_td").on("click",function (){
                $("#right_head").nextAll().hide();
                $("#modify_box").show();
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
    if(loginName_v(loginName) && pwd_v(password) && identityCode_v(identityCode) && email_v(email) && mobile_v(mobile)){
        $.ajax({
            url:"/easybuy/user/userAdd",
            type:"post",
            data:{"token":token,"loginName":loginName,"password":password,"userName":userName,"sex":sex,"identityCode":identityCode,"email":email,"mobile":mobile,"type":type},
            dataType:"JSON",
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
    var loginName = $("#modify_loginName").val();
    var userName = $("#modify_userName").val();
    var identityCode = $("#modify_identityCode").val();
    var email = $("#modify_email").val();
    var mobile = $("#modify_mobile").val();
    var type = $("#modify_type").val();
    var flag = true;
    //判断登陆名是否修改，修改的登陆名是否重复
    if(loginName != list[index].loginName){
        flag = loginName_v(loginName);
    }
    if(flag && identityCode_v(identityCode) && email_v(email) && mobile_v(mobile)){
        $.ajax({
            url:"/easybuy/user/userModify",
            type:"post",
            data:{"token":token,"id":list[index].id,"loginName":loginName,"userName":userName,"sex":list[index].sex,"identityCode":identityCode,"email":email,"mobile":mobile,"type":type},
            dataType:"JSON",
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
        url:"/easybuy/user/userRemove",
        type:"post",
        data:{"token":token,"id":list[index].id},
        dataType:"JSON",
        success:function(result){
            if(result){
                window.location.href = "/Member_Links.html";
            }else {
                alert("删除失败，权限不足");
            }
        }
    })
    return false;
}

// 用户名验证
function loginName_v(loginName){
    var flag=false;
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
        $(".loginName").nextAll("span").text("用户名已存在").show();
    }else{
        $(".loginName").nextAll("span").hide();
    }
    return !flag;
}

//密码格式验证
function pwd_v(pwd){
    var pwdReg = /^\d{6}$/;
    if(!pwdReg.test(pwd)){
        $(".pwd").nextAll("span").text("密码必须为6位整数").show();
        return false;
    }

    $(".pwd").nextAll("span").hide();
    return true;
}

//身份证号验证
function identityCode_v(identityCode){
    var numReg = /^\d{18}$/;
    if(!numReg.test(identityCode)){
        if(identityCode == "" || identityCode == null){
            $(".identityCode").nextAll("span").hide();
            return true;
        }
        $(".identityCode").nextAll("span").text("身份证号必须为18位整数").show();
        return false;
    }

    $(".identityCode").nextAll("span").hide();
    return true;
}

//邮箱验证
function email_v(email){
    var emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    if(!emailReg.test(email)){
        if(email == "" || email == null){
            $(".email").nextAll("span").hide();
            return true;
        }
        $(".email").nextAll("span").text("邮箱格式不正确").show();
        return false;
    }

    $(".email").nextAll("span").hide();
    return true
}

//手机号验证
function mobile_v(mobile){
    var telReg = /^\d{11}$/;
    if(!telReg.test(mobile)){
        if(mobile == "" || mobile == null){
            $(".mobile").nextAll("span").hide();
            return true;
        }
        $(".mobile").nextAll("span").text("手机号必须为11位").show();
        return false;
    }

    $(".mobile").nextAll("span").hide();
    return true
}