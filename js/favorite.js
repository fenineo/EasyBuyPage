//收藏夹js

var token = localStorage.getItem("token");

$(function (){
    if (token == null){
        //用户未登陆，不显示收藏夹
        $(".favoShow").hide();
        $("#emptyFavo").hide();
        $(".favoHide").show();
    }else {
        //用户已登陆，显示收藏夹
        $(".favoShow").show();
        $(".favoHide").hide();
        findFavorite();
    }

    //为添加收藏按钮动态绑定事件
    $(".addFavorite").on("click",function (){
        if (token != null){
            //用户已登陆，请求添加收藏夹
            var productId = $(this).attr("productId");
            addFavorite(productId);
        }else {
            //用户未登陆，显示登陆提示框
            $("#fade3").show();
            $("#MyDiv3").show();
        }
    });
    //收藏提示框按钮
    $("#favo_y").click(function (){
        $("#fade").hide();
        $("#MyDiv").hide();
    });
    //清空收藏夹按钮事件
    $("#emptyFavo").click(function (){
        removeFavorite(0,0);
    })
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
            "	<li>\n" +
            "		<div class=\"img\"><a href=\"Product.html?id="+favoriteList[i].id+"\"><img src='/img/"+favoriteList[i].fileName+"' width=\"185\" height=\"162\" /></a></div>\n" +
            "		<div class=\"name\"><a href=\"Product.html?id="+favoriteList[i].id+"\">"+favoriteList[i].name+"</a></div>\n" +
            "		<div class=\"price\">\n" +
            "			<font>￥<span>"+favoriteList[i].price+"</span></font> &nbsp; 库存："+favoriteList[i].stock+"\n" +
            "		</div>\n" +
            "		<div class=\"price\">\n" +
            "           <a href=\"#\" onclick=\"removeFavorite("+favoriteList[i].id+",1)\">取消收藏</a>&nbsp;&nbsp;\n" +
            "			<a href=\"#\" onclick=\"addShopping("+favoriteList[i].id+",1)\" class=\"addShopping\">加入购物车</a>\n" +
            "		</div>\n" +
            "	</li>\n";
    }
    //收藏夹不为空时，显示全部删除按钮
    if(favoriteList.length > 0){
        $("#emptyFavo").show();
    }else {
        $("#emptyFavo").hide();
    }
    $("#favorite").children().remove();
    $("#favorite").prepend(favoDom);
}

//向收藏夹添加商品的方法
function addFavorite(productId){
    $.ajax({
        url:"/easybuy/product/addFavorite",
        type:"post",
        data:{"productId":productId},
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success:function(result){
            if(result.flag){
                $("#fade").show();
                $("#MyDiv").show();
                var favoriteList = result.favoriteList;
                showFavorite(favoriteList);
            }else {
                alert("此商品已在收藏夹中");
            }
        }
    });
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