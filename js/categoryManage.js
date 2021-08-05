var token = localStorage.getItem("token");
var pgIndex = 0;//当前页码
var pageCount = 0;//总页数
var list = null;
var index = 0;
var gaiID;
$(function (){
    categorylist(1);
    jQuery("#tishi1").hide();
    jQuery("#tishi2").hide();

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
            var findtype="";
            for(var i = 0;i < list.length;i++){
                var father = "";
                if(list[i].type===1){
                    findtype = "一级分类";
                }else if(list[i].type===2){
                    findtype = "二级分类";
                }else if(list[i].type===3){
                    findtype = "三级分类";
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
                "<td>"+findtype+"</td>"+
                "<td>"+father+"</td>"+
                "<td><a class=\"modify_td\" name="+list[i].id+">修改</a></td>"+
                "<td><a class=\"remove_td\">删除</a></td>"+
                "</tr>"
            }
            $("#first_tr").after(categoryTable);
            //分页框拼接
            
            pageShow(result.categorypage);
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


//修改分类
function modify_sub(){
    var id=jQuery("#modify_name").attr("name");
    var name = $("#modify_name").val();

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
                alert("修改提交成功");
                window.location.href = "/Member_Commission.html";
            }else {
                alert("修改提交失败,请检查修改信息是否按要求填写。");
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




//点击添加分类按钮事件
$(document).on("click","#add_cate",function name(){
    $("#right_head").nextAll().hide();
    $("#add_box").show();
})


//点击选择分类级别判断,选择父级分类事件
function chang(){
    var addtypes=$("#addtype").val();
    var Splice="<tr id=\"hu\">\n" +
    "                            <td class=\"tx_l\">父级分类</td>\n" +
    "                            <td><select id=\"addparentId\" class=\"txipt addparentId\" maxlength=\"5\" onkeyup=\"value=value.replace(/[^\u4E00-\u9FA5]/g,'')\" required=\"required\">\n" +
    "                                <option value=\"0\">请选择</option>\n" +
    "                            </select></td>\n" +
    "                        </tr>";
    
    if(addtypes==1){
        
    }else if(addtypes==2){
        $("#addflpj").after(Splice);
        $.ajax({
            url:"/easybuy/productCategory/getCategoryLevel",
            type:"post",
            dataType:"JSON",
            beforeSend:function (XMLHttpRequest){
                XMLHttpRequest.setRequestHeader("token",token);
            },
            success:function(result){
                var Splicetype2="";
                for(var i=0;i<result.one.length;i++){
                    Splicetype2+="<option value="+result.one[i].id+">"+result.one[i].name+"</option>"   
                }
                $("#addparentId option").after(Splicetype2);
            }
        })
    }else if(addtypes==3){
        
        $("#addflpj").after(Splice);
        $.ajax({
            url:"/easybuy/productCategory/getCategoryLevel",
            type:"post",
            dataType:"JSON",
            beforeSend:function (XMLHttpRequest){
                XMLHttpRequest.setRequestHeader("token",token);
            },
            success:function(result){
                var Splicetype3="";
                for(var y=0;y<result.two.length;y++){
                    Splicetype3+="<option value="+result.two[y].id+">"+result.two[y].name+"</option>"
                }
                $("#addparentId option").after(Splicetype3);
            }
        })
    }
}


//添加分类点击提交事件
$(document).on("click","#tjtj",function name(){
    var name = $("#addname").val();
    var type = $("#addtype").val();
    if(name==""){
        alert("请输入正确的分类名称");
        jQuery("#tishi1").show();
        if (type==0) {
            alert("请选择的正确分类级别");
            jQuery("#tishi2").show();
        }else if (type!=0) {
            jQuery("#tishi2").hide();
        }
        // window.location.href = "/Member_Commission.html";
    }else if(name!=""){
        //yz
        jQuery("#tishi1").hide();
        if (type==0) {
            alert("请选择的正确分类级别");
            jQuery("#tishi2").show();
        }else if (type!=0) {
            jQuery("#tishi2").hide();
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
        }
    }
})


//分类名称验证是否存在
function changName(){
    var flag = false;
    if(addname=="" && addname==0){
        $.ajax({
            url:"/easybuy/productCategory/verificationTypeName",
            type:"post",
            dataType:"JSON",
            beforeSend:function (XMLHttpRequest){
                XMLHttpRequest.setRequestHeader("token",token);
            },
            success:function(result){
                alert(123);
            }
        })
    }
}

