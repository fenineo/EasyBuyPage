var token = localStorage.getItem("token");
var pgIndex = 0;//当前页码
var pageCount = 0;//总页数
var list = null;
var index = 0;
var gaiID;
$(function (){
    categorylist(1);
    jQuery("#tishi1").hide();
   

});


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
            var abc="";
            for(var i = 0;i < list.length;i++){
                var father = "";
                if(list[i].type===1){
                    abc = "一级分类";
                }else if(list[i].type===2){
                    abc = "二级分类";
                }else if(list[i].type===3){
                    abc = "三级分类";
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
                
                categoryTable +=
                "<tr>"+
                "<td>"+list[i].name+"</td>"+
                "<td>"+abc+"</td>"+
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
                // alert(parentId);
                var parentId="";
                var type="";
                for(var i=0;i<list.length;i++){
                    if(list[i].id==id){
                    parentId = list[i].parentId;
                    type = list[i].type;
                    }
                }
                
                // alert(parentId);
                // alert(type);
                $("#right_head").nextAll().hide();
                $("#modify_box").show();
                index = $(this).parent().parent().index() - 1;
                $("#modify_name").val(list[index].name);
                $("#modify_name").attr('name',id);
                // $("#modify_parentId").val(parentId);
                // $("#modify_type").val(type);
                $("#modify_parentId").val(list[index].parentId);
                $("#modify_type").val(list[index].type);
            });
            // 动态绑定删除事件
            $(".remove_td").on("click",function (){
                index = $(this).parent().parent().index() - 1;
                var flag = confirm("确认要删除分类\""+list[index].name+"\"吗？")
                var removeparentId = list[index].parentId
                
                if(flag && removeparentId!=""){
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
                // clean();
                // categorylist();
                window.location.href = "/Member_Commission.html";
            }else {
                alert("添加失败,请检查添加信息是否按要求填写。");
            }
        }
    })
}


//修改分类
function modify_sub(){
    var id=jQuery("#modify_name").attr("name");
    var name = $("#modify_name").val();
    // var parentId=jQuery("modify_parentId").attr("father");
    // var type=jQuery("modif_type").attr("type");
    // alert(id);
    var parentId = $("#modify_parentId").val();
    alert(parentId);
    var type = $("#modify_type").val();
    alert(type);
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
                // categorylist();
                window.location.href = "/Member_Commission.html";
            }else {
                alert("修改失败,请检查修改信息是否按要求填写。");
            }
        }
    })
}

//修改提交点击事件
$(document).on("click","#modtj",function name(){
    var id=jQuery("#modify_name").attr("name");
    var name = $("#modify_name").val();
    var parentId = $("#modify_parentId").val();
    var type = $("#modify_type").val();
    alert(jQuery("#modify_name").attr("name"));
    alert($("#modify_name").val());
    alert($("#modify_parentId").val());
    alert($("#modify_type").val());
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
                window.location.href = "/Member_Commission.html";
            }else {
                alert("修改失败,请检查修改信息是否按要求填写。");
            }
        }
    })
})


//删除分类
function removecate(id){
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




//点击添加分类事件
$(document).on("click","#add_cate",function name(){
    $("#right_head").nextAll().hide();
    $("#add_box").show();
})


//点击选择分类级别判断,选择父级分类事件
function chang(){
    var a=$("#addtype").val();
    var c="<tr id=\"hu\">\n" +
    "                            <td class=\"tx_l\">父级分类</td>\n" +
    "                            <td><select id=\"addparentId\" class=\"txipt addparentId\" maxlength=\"5\" onkeyup=\"value=value.replace(/[^\u4E00-\u9FA5]/g,'')\" required=\"required\">\n" +
    "                                <option value=\"0\">请选择</option>\n" +
    "                            </select></td>\n" +
    "                        </tr>";
    
    if(a==1){
        
    }else if(a==2){
        $("#addflpj").after(c);
        $.ajax({
            url:"/easybuy/productCategory/getCategoryLevel",
            dataType:"JSON",
            beforeSend:function (XMLHttpRequest){
                XMLHttpRequest.setRequestHeader("token",token);
            },
            success:function(result){
                var b="";
                for(var i=0;i<result.one.length;i++){
                    b+="<option value="+result.one[i].id+">"+result.one[i].name+"</option>"   
                }
                $("#addparentId option").after(b);
            }
        })
    }else if(a==3){
        $("#addflpj").after(c);
        $.ajax({
            url:"/easybuy/productCategory/getCategoryLevel",
            dataType:"JSON",
            beforeSend:function (XMLHttpRequest){
                XMLHttpRequest.setRequestHeader("token",token);
            },
            success:function(result){
                var d="";
                for(var y=0;y<result.two.length;y++){
                    d+="<option value="+result.two[y].id+">"+result.two[y].name+"</option>"
                }
                $("#addparentId option").after(d);
            }
        })
    }
}


//添加分类点击提交事件
$(document).on("click","#tjtj",function name(){
    var name = $("#addname").val();
    var type = $("#addtype").val();
    if(name=="" && type==0){
        alert("请输入正确的分类名称和分类级别");
        window.location.href = "/Member_Commission.html";
    }
    if(type==1){
        $.ajax({
            url:"/easybuy/productCategory/addProductCategory",
            type:"post",
            data:{"name":name,"parentId":0,"type":type},
            dataType:"JSON",
            beforeSend:function (XMLHttpRequest){
                XMLHttpRequest.setRequestHeader("token",token);
            },
            success:function(result){
                if(result){
                    alert("添加成功");
                    // clean();
                    // categorylist();
                    window.location.href = "/Member_Commission.html";
                }else {
                    alert("添加失败,请检查添加信息是否按要求填写。");
                }
            }
        })

    }else if(type==2){
        var parentId = $("#addparentId").val();
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
                    // clean();
                    // categorylist();
                    window.location.href = "/Member_Commission.html";
                }else {
                    alert("添加失败,请检查添加信息是否按要求填写。");
                }
            }
        })
    }else if(type==3){
        var parentId = $("#addparentId").val();
        $.ajax({
            url:"/easybuy/productCategory/addProductCategory",
            type:"post",
            data:{"name":name,"parentId":parentId,"type":type},
            dataType:"JSON",
            beforeSend:function(XMLHttpRequest){
                XMLHttpRequest.setRequestHeader("token",token);
            },
            success:function(result){
                if(result){
                    alert("添加成功");
                    window.location.href = "/Member_Commission.html";
                }else{
                    alert("添加失败,请检查添加信息是否按要求填写。");
                }
            }
        })
    }
})

//
$(document).on("click","#modif",function name(){
    
    var _id = 750;
    alert(_id);
 
})