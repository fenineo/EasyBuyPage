var pgIndex = 0;//当前页码
var pageCount = 0;//总页数
var userId=0;
var list = null;
var map1= null;
var map2= null;
var map3= null;
jQuery(function(){
    getAll();
    $("#jia").hide();
    getone();
 })
 /**
  * 分页查询
  */
 function getAll(pageIndex) {
     var isDelete=0;
    jQuery.ajax({
        url:"/easybuy/product/admin/getPageProduct",
        dataType: "json",
        data:{"pageIndex":pageIndex,"isDelete":isDelete},
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success: function(result){
            pageCount = result.pageCount;
            pgIndex = result.pageIndex;
            list = result.list;
            var Product="";
            for(var i=0;i<list.length;i++){
                Product +="<tr>"+
                "   <td width="+"25%"+" class='look' name="+list[i].id+">"+list[i].name+"</td>"+
                "   <td width="+"25%"+" class='look' name="+list[i].id+"><img src='/img/"+list[i].fileName+"' width="+80+" height="+50+"/></td>"+
                "   <td width="+"10%"+" class='look' name="+list[i].id+">"+list[i].price+"</td>"+
                "   <td width="+"10%"+">"+list[i].stock+"</td>"+
                "<td width="+"20%"+"><input type='button' class='update' name="+list[i].id+" value='修改'>&nbsp;&nbsp;<input type='button' class='delete' name="+list[i].id+" value='下架'></td>\n"+
                "</tr>";
            }
            jQuery("#first_tr").after(Product);
            //分页框拼接
            // var pageBox = "<div class=\"page\" onclick=\"page(1)\">首页</div>";
            // if(result.pageIndex>1){
            //     pageBox += "<div class=\"page\" onclick=\"page("+(result.pageIndex-1)+")\">上一页</div>";
            // }
            // if(pageCount>5 && pageIndex>2){
            //     for(var i = pageIndex-2;i<pageIndex+3;i++){
            //         if(i==pageIndex){
            //             pageBox += "<div class=\"page_ck\" onclick=\"page("+i+")\">"+i+"</div>";
            //         }else{
            //             pageBox += "<div class=\"page\" onclick=\"page("+i+")\">"+i+"</div>";
            //         }
            //     }
            // }else{
            //     for(var i = 1;i<=pageCount;i++){
            //         if(i==pageIndex){
            //             pageBox += "<div class=\"page_ck\" onclick=\"page("+i+")\">"+i+"</div>";
            //         }else{
            //             pageBox += "<div class=\"page\" onclick=\"page("+i+")\">"+i+"</div>";
            //         }
            //     }
            // }
            // if(result.pageIndex<pageCount){
            //     pageBox += "<div class=\"page\" onclick=\"page("+(result.pageIndex+1)+")\">下一页</div>";
            // }
            // pageBox += "<div class=\"page\" onclick=\"page("+pageCount+")\">尾页</div>";
            // jQuery("#pageBox").append(pageBox);
            pageShow(result);
        }})}
        //分页
function page(pageIndex){
    if(pageIndex != pgIndex){
        jQuery("#first_tr").nextAll("tr").remove();
        jQuery("#pageBox").empty();
        getAll(pageIndex);
    }
}

/**
 * 页面方法
 */
function clean(){
    $("#selete").remove();
    $("#pageBox").remove();
}
/**
 * 分级查询
 */
function getone(){
    $.ajax({
        url: "/easybuy/product/admin/getCategoryLevel",
        data: "json", //发送数据
        dataType : "json",
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success: function(result){
            map1=result.one;
            map2=result.two;
            map3=result.three;
            var typeOne="";
            for(var i=0;i<map1.length;i++){
                typeOne+="<option value="+map1[i].id+">"+map1[i].name+"</option>"
            }
            $("#yi option").after(typeOne);
        }
    })
}
/**
 * 选完一级分类后二级分类的展示
 */
function yicha(){
    $("#er option").nextAll("option").remove();
    var id=$("#yi").val();
    var typetwo="";
    for(var i=0;i<map2.length;i++){
        if(map2[i].parentId==id){
            typetwo+="<option value="+map2[i].id+">"+map2[i].name+"</option>"   
        }
    }
    $("#er option").after(typetwo);   
}
/**
 *  选完二级分类后三级分类的展示
 */
function ercha(){
    $("#san option").nextAll("option").remove();
    var id=$("#er").val();
    var typethree="";
    for(var i=0;i<map3.length;i++){
        if(map3[i].parentId==id){
            typethree+="<option value="+map3[i].id+">"+map3[i].name+"</option>"   
        }
    }
    $("#san option").after(typethree);
}
/**
 * 添加商品的点击事件
 */
jQuery(document).on("click","#addProduct",function name(){
    getone();   
    clean();
    $("#jia").show();
    $("#addProduct").hide();
    $("#picture").hide();
})  
/**
 * 确认添加的点击事件
 */
 jQuery(document).on("click","#tian",function name(){
    var name=$("#shopName").val();
    var price=$("#shopPrice").val();
    var stock=$("#shopStock").val();
    var fileName=$("#shopFileName").val();
    var categoryLevel1Id=$("#yi").val();
    var categoryLevel2Id=$("#er").val();
    var categoryLevel3Id=$("#san").val();
    if(name!="" && price!="" && stock!="" && fileName!="" && categoryLevel1Id!="" && categoryLevel2Id!="" && categoryLevel3Id!=""){
        $.ajax({
        url:"/easybuy/product/admin/addProduct",
        type: "POST",
        cache: false,
        data: new FormData(jQuery('#jia')[0]),   //关键，将表单元素封装成FormData对象
            processData: false,        //关键
            contentType: false,        //关键
        dataType: "json",
        // data:{"name":name,"price":price,"stock":stock,"fileName":fileName,"categoryLevel1Id":categoryLevel1Id,"categoryLevel2Id":categoryLevel2Id,"categoryLevel3Id":categoryLevel3Id},
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success: function(result){
            if (result == true) {
                alert("操作成功")
                window.location.href = "/Member_Safe.html";
            } else {
                alert("操作失败")
            }
        }
        })
    }else{
        alert("请填写所有必选项");
    }
}) 
/**
 * 修改的点击事件
 */
 $(document).on("click",".update",function name(){
    var id=$(this).attr("name");
    getone();
    clean();
    $("#jia").show();
    $("#addProduct").hide();
    $("#abc").hide();
    var a="<tr height=\"70\" id=\"abc\">" +
    "      <td colspan=\"2\" align=\"center\">" +
    "          <input type=\"button\" value=\"确认修改\" class=\"btn_tj\" id=\"gai\"/>" +
    "      </td>" +
    "    </tr>";
    $(".mem_tab").after(a);
    $("#cang").attr("value",id);
    var cang=$("#cang").val();
    var name="";
    var price="";
    var stock="";
    var categoryLevel1Id=null;
    var categoryLevel2Id="";
    var categoryLevel3Id="";
    var fileName="";
    for(var i=0;i<list.length;i++){
        if(list[i].id==id){
            categoryLevel1Id=list[i].categoryLevel1Id;
            categoryLevel2Id=list[i].categoryLevel2Id;
            categoryLevel3Id=list[i].categoryLevel3Id;
            name=list[i].name;
            price=list[i].price;
            stock=list[i].stock;
            fileName=list[i].fileName;
        }
    }
    $("#picture").attr("src","/img/"+fileName);
    $("#shopName").val(name);
    $("#shopPrice").val(price);
    $("#shopStock").val(stock);
    $("#yi").first("option").val(categoryLevel1Id);
    yicha();
    $("#er").first("option").val(categoryLevel2Id);
    ercha();
    $("#san").first("option").val(categoryLevel3Id);
    })
//     /**
//  * 修改的点击事件
//  */
//  $(document).on("click",".update",function name(){
//     var id=$(this).attr("name");
//     getone();
//     clean();
//     $("#jia").show();
//     $("#addProduct").hide();
//     $("#abc").hide();
//     var a="<tr height=\"70\" id=\"abc\">" +
//     "      <td colspan=\"2\" align=\"center\">" +
//     "          <input type=\"button\" value=\"确认修改\" class=\"btn_tj\" id=\"gai\"/>" +
//     "      </td>" +
//     "    </tr>";
//     $(".mem_tab").after(a);
//     $("#cang").attr("value",id);
//     var cang=$("#cang").val();
//     var categoryLevel1Id="";
//     var categoryLevel2Id="";
//     var categoryLevel3Id="";
//     $.ajax({
//         url:"/easybuy/products/getPById",
//         dataType: "json",
//         data:{"id":id,},
//         beforeSend:function (XMLHttpRequest){
//             XMLHttpRequest.setRequestHeader("token",token);
//         },
//         success: function(result){
//             for(var i=0;i<map1.length;i++){
//                 if(map1[i].id==result.categoryLevel1Id){
//                     categoryLevel1Id=map1[i].id
//                 }
//             }
//             for(var i=0;i<map2.length;i++){
//                 if(map2[i].id==result.categoryLevel2Id){
//                     categoryLevel2Id=map2[i].id
//                 }
//             }
//             for(var i=0;i<map3.length;i++){
//                 if(map3[i].id==result.categoryLevel3Id){
//                     categoryLevel3Id=map3[i].id
//                 }
//             }
//             $("#yi").first("option").val(categoryLevel1Id);
//             yicha();
//             $("#er").first("option").val(categoryLevel2Id);
//             ercha();
//             $("#san").first("option").val(categoryLevel3Id);
//             $("#shopName").val(result.name);
//             $("#shopPrice").val(result.price);
//             $("#shopStock").val(result.stock);
//             $("#shopFileName").val("<img src='/img/"+result.fileName+"' width="+80+" height="+50+"/>");
//         }
//         })
//     })
 /**
  * 确认修改的点击事件
  */
 $(document).on("click","#gai",function name(){
    var id=$("#gai").attr("name");
    var name=$("#shopName").val();
    var price=$("#shopPrice").val();
    var stock=$("#shopStock").val();
    var fileName=$("#shopFileName").val();
    var categoryLevel1Id=$("#yi").val();
    var categoryLevel2Id=$("#er").val();
    var categoryLevel3Id=$("#san").val();
    var picture=$("#picture").attr("src");
    
     if(name!="" && price!="" && stock!="" &&  categoryLevel1Id!="" && categoryLevel2Id!="" && categoryLevel3Id!=""){
         if(fileName!="" || picture!=""){
            $.ajax({
                url:"/easybuy/product/admin/modifyProduct",
                type: "POST",
                cache: false,
                data: new FormData(jQuery('#jia')[0]),   //关键，将表单元素封装成FormData对象
                    processData: false,        //关键
                    contentType: false,        //关键
                dataType: "json",
                // data:{"name":name,"price":price,"stock":stock,"fileName":fileName,"categoryLevel1Id":categoryLevel1Id,"categoryLevel2Id":categoryLevel2Id,"categoryLevel3Id":categoryLevel3Id},
                beforeSend:function (XMLHttpRequest){
                    XMLHttpRequest.setRequestHeader("token",token);
                },
                success: function(result){
                    if (result == true) {
                        alert("操作成功")
                        window.location.href = "/Member_Safe.html";
                    } else {
                        alert("操作失败")
                    }
                }
                })
         }
    }else{
        alert("请填写所有必选项");
    }
 })
 /**
  * 下架的点击事件
  */
  $(document).on("click",".delete",function name(){
    var id=$(this).attr("name");
    var flag=confirm("确定要下架吗");
    if(flag){
        $.ajax({
            url:"/easybuy/product/admin/removeProduct",
            dataType: "text",
            data:{"id":id},
            beforeSend:function (XMLHttpRequest){
                XMLHttpRequest.setRequestHeader("token",token);
            },
            success: function(result){
                alert("下架成功");
                window.location.href = "/Member_Safe.html";
            }
            })
      }
    }
  )