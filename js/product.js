var pgIndex = 0;//当前页码
var pageCount = 0;//总页数
var userId=0;
var list = null;
var map1= null;
var map2= null;
var map3= null;
jQuery(function(){
    getAll();
    getone();
 })
 function getAll(pageIndex) {
    jQuery.ajax({
        url:"/easybuy/products/tourist/getPageProduct",
        dataType: "json",
        data:{"pageIndex":pageIndex},
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
                "   <td width="+"25%"+" class='look' name="+list[i].id+"><img src="+"27A1789ED5764D82A5506DF3DC3933F9.jpg"+"/></td>"+
                "   <td width="+"10%"+" class='look' name="+list[i].id+">"+list[i].price+"</td>"+
                "   <td width="+"10%"+">"+list[i].stock+"</td>"+
                "   <td width="+"10%"+">"+(list[i].isDelete == 0 ? "已上架":"未上架")+"</td>"+
                "<td width="+"20%"+"><input type='button' class='update' name="+list[i].id+" value='修改'>&nbsp;&nbsp;<input type='button' class='delete' name="+list[i].id+" value='下架'></td>\n"+
                "</tr>";
            }
            jQuery("#first_tr").after(Product);
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
            jQuery("#pageBox").append(pageBox);
        }})}
        //分页
function page(pageIndex){
    if(pageIndex != pgIndex){
        jQuery("#first_tr").nextAll("tr").remove();
        jQuery("#pageBox").empty();
        getAll(pageIndex);
    }
}
$(document).on("click","#addNews",function name(){
    var formData = new FormData();
        formData.append("pic",document.getElementById("upfile").files[0]);
        alert(formData);
        $.ajax({
            type: "POST", // 数据提交类型
            url: "", // 发送地址
            data: formData, //发送数据
            async: true, // 是否异步
            processData: false, //processData 默认为false，当设置为true的时候,jquery ajax 提交的时候不会序列化 data，而是直接使用data
            contentType: false //
        });
})
$(document).on("click","#jiao",function name(){
    var formData=$("#dsa").val();
    $.ajax({
        url:"/easybuy/products/tourist/addProduct",
        data:{"formData":formData},
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success: function(result){
                alert("123");
        }
    })
})
function yicha(){
    $("#er option").after(
        "<option>男</option>"
    )
}
function getone(){
    $.ajax({
        url: "/easybuy/products/tourist/getCategoryLevel", // 发送地址
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
            for(var i=0;i<result.one.length;i++){
                typeOne+="<option>"+result.one[i].name+"</option>"
            }
            $("#yi option").after(typeOne);
        }
    })
}