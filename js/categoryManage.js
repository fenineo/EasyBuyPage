var token = localStorage.getItem("token");
var pgIndex = 0;//当前页码
var pageCount = 0;//总页数
var list = null;
var index = 0;
var map1= null;
var map2= null;
var map3= null;
var gaiID;
$(function (){
    categorylist(1);



});


$(document).on("click","#add_cate",function name(){
    $("#right_head").nextAll().hide();
    $("#add_box").show();

    getone1();
})


//查询分类集合
function categorylist(pageIndex){
    $.ajax({
        url:"/easybuy/productCategory/categorylist",
        type:"post",
        data:{"pageIndex":pageIndex},
        dataType:"JSON",
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
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
                "<td><a class=\"modify_td\" name="+list[i].id+">修改</a></td>"+
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
            $(".modify_td").on("click",function (){
                var id=jQuery(this).attr("name");
                $("#right_head").nextAll().hide();
                $("#modify_box").show();
                index = $(this).parent().parent().index() - 1;
                $("#modify_name").val(list[index].name);
                $("#modify_name").attr('name',id);
                $("#modify_parentId").val(list[index].parentId);
                $("#modify_type").val(list[index].type);
            });
            // 动态绑定删除事件
            $(".remove_td").on("click",function (){
                index = $(this).parent().parent().index() - 1;
                var flag = confirm("确认要删除分类\""+list[index].name+"\"吗？")
                if(flag){
                    removecate(list[index].id);
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
        categorylist(pageIndex);
    }
}




//添加分类
function add_sub(){
    var name = $("#addname").val();
    var parentId = $("#addparentId").val();
    var type = $("#addtype").val();
    $.ajax({
        url:"/easybuy/productCategory/addProductCategory",
        type:"post",
        data:{"name":name,"parentId":parentId,"type":type},
        dataType:"JSON",
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success:function(result){
            if(result){
                alert("添加成功");
                clean();
                // categorylist();
                window.location.href = "/Member_Commission.html";
            }else {
                alert("添加失败,请检查添加信息是否按要求填写。");
            }
        }
    })
}


//修改用户
function modify_sub(id){
    var id=jQuery("#modify_name").attr("name");
    var name = $("#modify_name").val();
    var parentId = $("#modify_parentId").val();
    var type = $("#modify_type").val();
    // alert(parentId);
    $.ajax({
        url:"/easybuy/productCategory/modifyProductCategory",
        type:"post",
        data:{"id":id,"name":name,"parentId":parentId,"type":type},
        dataType:"JSON",
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success:function(result){
            if(result){
                alert("修改成功");
                clean();
                // categorylist();
                window.location.href = "/Member_Commission.html";
            }else {
                alert("修改失败,请检查修改信息是否按要求填写。");
            }
        }
    })
}

//删除分类
function removecate(id){
    var name = $("#modify_name").val();
    $.ajax({
        url:"/easybuy/productCategory/removeProductCategory",
        type:"post",
        data:{"id":list[index].id},
        dataType:"JSON",
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success:function(result){
            if(result){
                window.location.href = "/Member_Commission.html";
            }else {
                alert("删除失败，权限不足");
            }
        }
    })
    return false;
}

//修改提交点击事件
$(".btn_tj").click(function(){
    modify_sub();
})

$(document).on("click","#add_cate",function name(){
    $("#right_head").nextAll().hide();
    $("#add_box").show();
    var name=$("#addname").val();
    alert(name);
})


function getone2(){
    var id=$("#addtype").val();
    alert(id);
}


function add(id){
    if(id==1){
        var type1=$("#addtype");
    }else if(id==2){

    }else if(id==3){

    }
}