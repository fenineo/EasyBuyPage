//商品详情页js
var productId = 0;
var product = null;
var path = "";

$(function (){
    //获取要显示商品的id
    var productId = window.location.search.substr(4);
    $(".addShopping,.addFavorite").attr("productId",productId);

    //请求获取商品信息
    $.ajax({
        url:"/easybuy/product/tourist/productInfo",
        type:"post",
        data:{"id":productId},
        dataType:"JSON",
        success:function(result){
            path = result.path;
            $("#path").text(path);

            product = result.product;
            $("#product_name").text(product.name);
            $("#product_description").text(product.description);
            $("#stock").text(product.stock);
            $("#product_price").text("￥"+product.price);

            //动态添加收藏夹的js，让其慢于商品页面加载，为添加收藏夹按钮动态绑定事件
            var js =
                "    <script type=\"text/javascript\" src=\"js/favorite.js\"></script>"
            $("title").before(js);
            //动态添加购物车的js，让其慢于商品页面加载，为添加购物车按钮动态绑定事件
            var js =
                "    <script type=\"text/javascript\" src=\"js/shopping.js\"></script>"
            $("title").before(js);
        }
    })
})

function sub(){
    var name = $("#search").val();
    var url = "CategoryList.html?name="+name;
    //编码字符串，接收时解码可以获取中文参数
    var searchUrl = encodeURI(url)
    window.location.href = searchUrl;
    return false;
}