var index = 0;
var productList = null;
var productDom =
    "";

$(function (){
    var name = window.location.search.substr(6)
    //解码字符串，获取中文参数
    name = decodeURI(name);
    findPageByName(1,name)
});

function findPageByName(pageIndex,name){
    $.ajax({
        url:"/easybuy/product/tourist/productInfoByName",
        type:"post",
        data:{"pageIndex":pageIndex,"pageSize":20,"name":name},
        dataType:"JSON",
        success:function(result){
            index = pageIndex;
            var pageCount = result.productPage.pageCount;

            totalCount = result.productPage.totalCount;
            $("#totalCount").text(totalCount);//设置总记录数

            productList = result.productPage.list;//保存商品集合
            if (productList.length > 0){
                //遍历商品集合，拼接商品展示页面
                for (var i = 0;i < productList.length;i++){
                    //判断商品是否下架
                    if(productList[i].isDelete == 0){
                        productDom +=
                            "<li>" +
                            "	<div class=\"img\"><a href=\"Product.html?id="+productList[i].id+"\"><img src=\"images/per_3.jpg\" width=\"210\" height=\"185\" /></a></div>" +
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
//分页查询
function page(pageIndex){
    if(pageIndex != pgIndex){
        $("#cate_list").empty();
        $(".pages").empty();
        productByCategory(pageIndex,categoryId)
    }
}