var productDom = "";
var token = localStorage.getItem("token");

var categoryId = 0;
var path = "";              //商品分类路径
var productList = null;     //商品集合
var index = 0;              //当前页数
var totalCount = 0;         //总记录数


$(function (){
    //获取商品分类id
    var categoryId = window.location.search.substr(4);
    //根据商品分类查询第一页商品
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
            $("#path").text(path);//设置商品分类路径
            totalCount = result.productPage.totalCount;
            $("#totalCount").text(totalCount);//设置总记录数

            productList = result.productPage.list;
            //遍历商品集合，拼接商品展示页面
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
                    "		<a href=\"javascript:void(0)\" productId=\""+productList[i].id+"\" class=\"j_car addShopping\">加入购物车</a>" +
                    "	</div>" +
                    "</li>";
            }
            $("#cate_list").append(productDom);
            //动态添加购物车的js，让其慢于商品页面加载，为添加购物车按钮动态绑定事件
            var js =
                "    <script type=\"text/javascript\" src=\"js/shopping.js\"></script>"
            $("title").before(js);
        }
    })
}