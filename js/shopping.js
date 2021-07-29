var token = localStorage.getItem("token");
var shoppingDom = "";
var shoppingProduct = null;

$(function (){
    //关闭登陆提示框
    $(".close").click(function (){
        var show_div = $(this).parent().parent().parent();
        var bg_div = $(this).parent().parent().parent().prev();
        closeDiv(show_div,bg_div);
    })
    //为继续购物按钮绑定事件
    $(".b_buy").click(function (){
        $("#fade1").hide();
        $("#MyDiv1").hide();
    })
    //为添加购物车按钮动态绑定事件
    $(".addShopping").on("click",function (){
        if (token != null){
            var productId = $(this).attr("productId");
            var number = $("#number").val();
            addShopping(token,productId,number);
        }else {
            $("#fade3").show();
            $("#MyDiv3").show();
        }
    })
    //判断登陆状况，动态显示购物车
    if (token == null){
        shoppingDom =
            "<div class=\"car_t\">购物车</div>" +
            "	<div class=\"car_bg\">" +
            "		<!--Begin 购物车未登录 Begin-->" +
            "		<div class=\"un_login\">还未登录！<a href=\"Login.html\" style=\"color:#ff4e00;\">马上登录</a> 查看购物车！</div>" +
            "		<!--End 购物车未登录 End-->" +
            "</div>";
        $("#shopping").append(shoppingDom);
    }else {
        findShopping(token);
    }

});

//向购物车添加商品
function addShopping(token,productId,number){
    $.ajax({
        url:"/easybuy/product/addShopping",
        type:"post",
        data:{"token":token,"productId":productId,"number":number},
        dataType:"JSON",
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success:function(result){
            shoppingProduct = result.shoppingProduct;
            showShopping(shoppingProduct);
            if (result.flag){
                $("#MyDiv1").show();
                $("#fade1").show();
            }
        }
    });
}

//查询购物车
function findShopping(token){
    $.ajax({
        url:"/easybuy/product/findShopping",
        type:"post",
        data:{"token":token},
        dataType:"JSON",
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success:function(result){
            shoppingProduct = result;
            showShopping(shoppingProduct);
        }
    })
}

$.ajax({
    url:"/easybuy/product/findShopping",
    type:"post",
    data:{"token":token},
    dataType:"JSON",
    beforeSend:function (XMLHttpRequest){
        XMLHttpRequest.setRequestHeader("token",token);
    },
    success:function(result){
    }
})

//展示购物车
function showShopping(shoppingProduct){
    var sum = 0;
    shoppingDom =
        "<div class=\"car_t\">购物车 [ <span>"+shoppingProduct.length+"</span> ]</div>" +
        "	<div class=\"car_bg\">" +
        "		<!--Begin 购物车已登录 Begin-->" +
        "		<ul class=\"cars\">";
    for (var i = 0;i < shoppingProduct.length;i++){
        if (i == 4){
            break;
        }
        shoppingDom +=
        "			<li>" +
        "				<div class=\"img\"><a href=\"Product.html?id="+shoppingProduct[i].id+"\"><img src=\"images/car1.jpg\" width=\"58\" height=\"58\" /></a></div>" +
        "				<div class=\"name\"><a href=\"Product.html?id="+shoppingProduct[i].id+"\">"+shoppingProduct[i].name+"</a></div>" +
        "				<div class=\"price\"><font color=\"#ff4e00\">￥"+shoppingProduct[i].price+"</font> X"+shoppingProduct[i].stock+"</div>" +
        "			</li>";
        sum += shoppingProduct[i].price*shoppingProduct[i].stock;
    }
    shoppingDom +=
        "		</ul>" +
        "		<div class=\"price_sum\">共计&nbsp; <font color=\"#ff4e00\">￥</font><span>"+sum+"</span></div>";
    if (sum > 0){
        shoppingDom +=
        "		<div class=\"price_a\"><a href=\"BuyCar.html\">去购物车结算</a></div>";
    }
    shoppingDom +=
        "		<!--End 购物车已登录 End-->" +
        "</div>";
    $("#shopping").children().remove();
    $("#shopping").prepend(shoppingDom);
}
//隐藏提示框
function closeDiv(show_div,bg_div){
    $(show_div).hide();
    $(bg_div).hide();
}