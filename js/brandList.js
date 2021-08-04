//分类商品展示页js
var token = localStorage.getItem("token");
var productDom = "";

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
        url:"/easybuy/product/tourist/productInfoBycategory",
        type:"post",
        data:{"pageIndex":pageIndex,"pageSize":20,"categoryId":categoryId},
        dataType:"JSON",
        success:function(result){
            index = pageIndex;
            var pageCount = result.productPage.pageCount;
            path = result.path;
            $("#path").text(path);//设置商品分类路径
            totalCount = result.productPage.totalCount;
            $("#totalCount").text(totalCount);//设置总记录数

            productList = result.productPage.list;
            if (productList.length > 0){
                //遍历商品集合，拼接商品展示页面
                for (var i = 0;i < productList.length;i++){
                    //判断商品是否下架
                    if(productList[i].isDelete == 0){
                        productDom +=
                            "<li>" +
                            "	<div class=\"img\"><a href=\"Product.html?id="+productList[i].id+"\"><img src=\"images/per_1.jpg\" width=\"210\" height=\"185\" /></a></div>" +
                            "	<div class=\"price\">" +
                            "		<font>￥<span>"+productList[i].price+"</span></font> &nbsp; 库存："+productList[i].stock+"" +
                            "	</div>" +
                            "	<div class=\"name\"><a href=\"Product.html?id="+productList[i].id+"\">"+productList[i].name+"</a></div>" +
                            "	<div class=\"carbg\">" +
                            "		<a href=\"#\" productId=\""+productList[i].id+"\" class=\"ss addFavorite\">收藏</a>" +
                            "		<a href=\"javascript:void(0)\" productId=\""+productList[i].id+"\" class=\"j_car addShopping\">加入购物车</a>" +
                            "	</div>" +
                            "</li>";
                    }
                }
                $("#cate_list").append(productDom);

                //拼接分页
                var pageBox = "<a href=\"javascript:void(0);\" class=\"p_pre\" onclick=\"page(1)\">首页</a>"
                if(index>1){
                    pageBox += "<a href=\"javascript:void(0);\" class=\"p_pre\"onclick=\"page("+(index-1)+")\">上一页</a>";
                }
                if(pageCount>5 && index>2 && (index+2) <= pageCount){
                    for(var i = index-2;i<index+3;i++){
                        if(i==index){
                            pageBox += "<a href=\"javascript:void(0);\" class=\"cur\" onclick=\"page("+i+")\">"+i+"</a>";
                        }else{
                            pageBox += "<a href=\"javascript:void(0);\" onclick=\"page("+i+")\">"+i+"</a>";
                        }
                    }
                }else{
                    for(var i = 1;i<=pageCount;i++){
                        if(i==index){
                            pageBox += "<a href=\"javascript:void(0);\" class=\"cur\" onclick=\"page("+i+")\">"+i+"</a>";
                        }else{
                            pageBox += "<a href=\"javascript:void(0);\" onclick=\"page("+i+")\">"+i+"</a>";
                        }
                    }
                }
                if(index < pageCount){
                    pageBox += "<a href=\"javascript:void(0);\" class=\"p_pre\" onclick=\"page("+(index+1)+")\">下一页</a>";
                }
                pageBox += "<a href=\"javascript:void(0);\" class=\"p_pre\" onclick=\"page("+pageCount+")\">尾页</a>";
                $(".pages").append(pageBox);
            }else {
                $("#nullProduct").show();
            }

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
}

function page(pageIndex){
    if(pageIndex != pgIndex){
        $("#cate_list").empty();
        $(".pages").empty();
        productByCategory(pageIndex,categoryId)
    }
}