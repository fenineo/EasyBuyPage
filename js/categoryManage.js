var token = localStorage.getItem("token");
var pgIndex = 0;//当前页码
var pageCount = 0;//总页数
var list = null;
var index = 0;


$(function (){
    categorylist(1);

    // $.ajax({
    //     url:"/easybuy/user/loginInfo",
    //     type:"post",
    //     data:{"token":token},
    //     dataType:"JSON",
    //     success:function(result){
    //         alert("id"+result.id);
    //         alert("loginName"+result.loginName);
    //         alert("type"+result.type);
    //     }
    // });
    

   
});




//查询分类集合
function categorylist(pageIndex){
    $.ajax({
        url:"/easybuy/productCategory/categorylist",
        type:"post",
        data:{"pageIndex":pageIndex},
        dataType:"JSON",
        success:function(result){
            pageCount = result.categorypage.pageCount;
            pgIndex = result.categorypage.pageIndex;
            list = result.categorypage.list;
            list2 = result.productCategoryList2;

            
            //分类列表拼接
            var categoryTable = "";
            for(var i = 0;i < list.length;i++){
                var father = "";
                if(list[i].type===1){
                    list[i].type = "一级分类";
                }else if(list[i].type===2){
                    list[i].type = "二级分类";
                }else if(list[i].type===3){
                    list[i].type = "三级分类";
                }
                if (list[i].parentId == 0){
                    father = "无";
                }else {
                    for (var u=0;u < list2.length;u++){
                        if (list[i].parentId == list2[u].id) {
                            father = list2[u].name
                        }
                    }
                }
                if(list[i].name)
                categoryTable +=
                "<tr>"+
                "<td>"+list[i].id+"</td>"+
                "<td>"+list[i].name+"</td>"+
                "<td>"+list[i].type +"</td>"+
                "<td>"+father+"</td>"+
                "<td><a class=\"modify_td\">修改</a></td>"+
                "<td><a class=\"remove_td\">删除</a></td>"+
                "</tr>"
            }
            $("#first_tr").after(categoryTable);

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
            // $(".modify_td").on("click",function (){
            //     $("#right_head").nextAll().hide();
            //     $("#modify_box").show();
            //     index = $(this).parent().parent().index() - 1;
            //     $("#modify_name").val(list[index].loginName);
            //     $("#modify_parentId").val(list[index].parentId);parentId
            //     $("#modify_identityCode").val(list[index].identityCode);
            //     $("#modify_email").val(list[index].email);
            //     $("#modify_mobile").val(list[index].mobile);
            //     $("#modify_type").val(list[index].type);
            // });
            //动态绑定删除事件
            // $(".remove_td").on("click",function (){
            //     index = $(this).parent().parent().index() - 1;
            //     var flag = confirm("确认要删除分类\""+list[index].name+"\"吗？")
            //     if(flag){
            //         removeUser(list[index].id);
            //     }
            // })

        }
    });
}

//分页
function page(pageIndex){
    if(pageIndex != pgIndex){
        $("#first_tr").nextAll("tr").remove();
        $("#pageBox").empty();
        categorylist(pageIndex);
    }else{
        $("#first_tr").nextAll("tr").remove();
        $("#pageBox").empty();
    }
}

//添加用户
// function add_sub(){
//     var loginName = $("#add_loginName").val();
//     var password = $("#add_pwd").val();
//     var userName = $("#add_userName").val();
//     var sex = $("input:radio:checked").val();
//     var identityCode = $("#add_identityCode").val();
//     var email = $("#add_email").val();
//     var mobile = $("#add_mobile").val();
//     var type = $("#add_type").val();
//     if(loginName_v(loginName) && pwd_v(password) && identityCode_v(identityCode) && email_v(email) && mobile_v(mobile)){
//         $.ajax({
//             url:"/easybuy/user/userAdd",
//             type:"post",
//             data:{"token":token,"loginName":loginName,"password":password,"userName":userName,"sex":sex,"identityCode":identityCode,"email":email,"mobile":mobile,"type":type},
//             dataType:"JSON",
//             success:function(result){
//                 if(result){
//                     window.location.href = "/Member_Links.html";
//                 }else {
//                     alert("添加失败,请检查添加信息是否按要求填写。");
//                 }
//             }
//         })
//     }else{
//         alert("请按要求填写添加信息！");
//     }
//     return false;
// }

//修改用户
// function modify_sub(){
//     var name = $("#modify_name").val();
//     var parentId = $("#modify_parentId").val();
//     var identityCode = $("#modify_identityCode").val();
//     var email = $("#modify_email").val();
//     var mobile = $("#modify_mobile").val();
//     var type = $("#modify_type").val();
//     var flag = true;
//     //判断登陆名是否修改，修改的登陆名是否重复
//     if(name != list[index].name){
//         flag = Name_v(name);
//     }
//     if(flag && identityCode_v(identityCode) && email_v(email) && mobile_v(mobile)){
//         $.ajax({
//             url:"/easybuy/user/userModify",
//             type:"post",
//             data:{"token":token,"id":list[index].id,"name":name,"parentId":parentId,"sex":list[index].sex,"identityCode":identityCode,"email":email,"mobile":mobile,"type":type},
//             dataType:"JSON",
//             success:function(result){
//                 if(result){
//                     window.location.href = "/Member_Commission.html";
//                 }else {
//                     alert("修改失败,请检查修改信息是否按要求填写。");
//                 }
//             }
//         })
//     }else{
//         alert("请按要求填写修改信息！");
//     }
//     return false;
// }

//删除用户
// function removeUser(id){
//     var name = $("#modify_name").val();
//     $.ajax({
//         url:"/easybuy/productCategory/removeProductCategory",
//         type:"post",
//         data:{"token":token,"id":list[index].id},
//         dataType:"JSON",
//         success:function(result){
//             if(result){
//                 window.location.href = "/Member_Commission.html";
//             }else {
//                 alert("删除失败，权限不足");
//             }
//         }
//     })
//     return false;
// }

// // 用户名验证
// function loginName_v(loginName){
//     var flag=false;
//     $.ajax({
//         url:"/easybuy/user/existLoginName",
//         type:"post",
//         data:{"loginName":loginName},
//         dataType:"JSON",
//         async:false,
//         success:function(result){
//             flag = result;
//         }
//     });
//     if(flag){
//         $(".loginName").nextAll("span").text("用户名已存在").show();
//     }else{
//         $(".loginName").nextAll("span").hide();
//     }
//     return !flag;
// }
