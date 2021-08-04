var token = localStorage.getItem("token");

$(function (){
    findFavorite();
});

//查询收藏夹的方法
function findFavorite(){
    $.ajax({
        url:"/easybuy/product/findFavorite",
        type:"post",
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success:function(result){
            favoriteList = result;
            showFavorite(favoriteList);
        }
    })
}
//展示收藏夹的方法
function showFavorite(favoriteList){
    var favoDom = "";
    for (var i = 0;i < favoriteList.length;i++){
        favoDom +=
            "	<tr>\n" +
            "		<td style=\"font-family:'宋体';\">\n" +
            "			<div class=\"sm_img\"><img src='/img/"+favoriteList[i].fileName+"' width=\"48\" height=\"48\" /></div>"+favoriteList[i].name+"\n" +
            "		</td>\n" +
            "		<td align=\"center\">￥"+favoriteList[i].price+"</td>\n" +
            "		<td align=\"center\"><a href=\"#\" style=\"color:#ff4e00;\" productId=\""+favoriteList[i].id+"\" class=\"addShopping\">加入购物车</a>\n" +
            "			&nbsp; &nbsp; <a href=\"#\" onclick=\"removeFavorite("+favoriteList[i].id+",1)\">删除</a>\n" +
            "		</td>\n" +
            "	</tr>";
    }
    $("#totalPage").text("共发现"+favoriteList.length+"件");
    $("#favoBegin").nextAll("tr").remove();
    $("#favoBegin").after(favoDom);

    //动态添加购物车的js，让其慢于商品页面加载，为添加购物车按钮动态绑定事件
    var js =
        "    <script type=\"text/javascript\" src=\"js/shopping.js\"></script>"
    $("title").before(js);
}

//删除收藏的方法
function removeFavorite(productId,amount){
    $.ajax({
        url:"/easybuy/product/removeFavorite",
        type:"post",
        data:{"productId":productId,"amount":amount},
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success:function(result){
            if (result.flag){
                showFavorite(result.favoriteList);
            }else {
                alert("删除失败");
            }
        }
    })
}