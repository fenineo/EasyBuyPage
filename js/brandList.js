// "<li>" +
// "	<div class=\"img\"><a href=\"Product.html?id=1\"><img src=\"images/per_1.jpg\" width=\"210\" height=\"185\" /></a></div>" +
// "	<div class=\"price\">" +
// "		<font>￥<span>198.00</span></font> &nbsp; 库存：111" +
// "	</div>" +
// "	<div class=\"name\"><a href=\"Product.html?id=1\">香奈儿邂逅清新淡香水50ml</a></div>" +
// "	<div class=\"carbg\">" +
// "		<a href=\"#\" class=\"ss\">收藏</a>" +
// "		<a href=\"javascript:void(0)\" productId=\"2\" class=\"j_car add_shopping\">加入购物车</a>" +
// "	</div>" +
// "</li>";

var productDom = "";
var token = localStorage.getItem("token");

var categoryId = 0;
var path = "";
var productList = null;
var index = 0;
var totalCount = 0;


$(function (){
    var categoryId = window.location.search.substr(4);

    productByCategory(1,categoryId);
})

//根据商品分类分页查询商品
function productByCategory(pageIndex,categoryId){
    $.ajax({
        url:"/easybuy/product/productInfoBycategory",
        type:"post",
        data:{"pageIndex":pageIndex,"pageSize":20,"categoryId":categoryId},
        dataType:"JSON",
        success:function(result){
            index = pageIndex;
            path = result.path;
            $("#path").text(path);
            totalCount = result.productPage.totalCount;
            $("#totalCount").text(totalCount);

            productList = result.productPage.list;
            for (var i = 0;i < productList.length;i++){
                productDom +=
                    "<li>" +
                    "	<div class=\"img\"><a href=\"Product.html?id="+productList[i].id+"\"><img src=\"images/per_1.jpg\" width=\"210\" height=\"185\" /></a></div>" +
                    "	<div class=\"price\">" +
                    "		<font>￥<span>"+productList[i].price+"</span></font> &nbsp; 库存："+productList[i].stock+"" +
                    "	</div>" +
                    "	<div class=\"name\"><a href=\"Product.html?id="+productList[i].id+"\">"+productList[i].name+"</a></div>" +
                    "	<div class=\"carbg\">" +
                    "		<a href=\"#\" class=\"ss\">收藏</a>" +
                    "		<a href=\"javascript:void(0)\" productId=\""+productList[i].id+"\" class=\"j_car add_shopping\">加入购物车</a>" +
                    "	</div>" +
                    "</li>";
            }
            $("#cate_list").append(productDom);

            $(".add_shopping").on("click",function (){
                var productId = $(this).attr("productId");
                addShopping(productId);
            })
        }
    })
}

function addShopping(productId){
    $("#MyDiv1").show();
    $("#fade1").show();
    // if (token != null){
    //     $("#close").click(function (){
    //         $("#MyDiv1").hide();
    //         $("#fade1").hide();
    //     })
    // }else {
    //     $(".fide").show();
    //     $(".toLogin").show();
    //     $("#close").click(function (){
    //         $(".fide").hide();
    //         $(".toLogin").hide();
    //     })
    // }
};