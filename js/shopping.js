var token = localStorage.getItem("token");
var shoppingDom = "";
var shoppingProduct = null;

$(function (){
    //判断登陆状况，动态显示购物车
    if (token == null){
        //未登陆，展示登陆提示
        shoppingDom =
            "<div class=\"car_t\">购物车</div>" +
            "	<div class=\"car_bg\">" +
            "		<!--Begin 购物车未登录 Begin-->" +
            "		<div class=\"un_login\">还未登录！<a href=\"Login.html\" style=\"color:#ff4e00;\">马上登录</a> 查看购物车！</div>" +
            "		<!--End 购物车未登录 End-->" +
            "</div>";
        $("#shopping").append(shoppingDom);
    }else {
        //已登陆，调用展示购物车方法
        findShopping();
    }

    //为数量框动态绑定value值变化事件
    $("#number").on("input propertychange",function (){
        var number = $(this).val();
        numberVerify(number);
    })
    //为添加购物车按钮动态绑定事件
    $(".addShopping").on("click",function (){
        if (token != null){
            //用户已登陆，请求添加购物车
            var productId = $(this).attr("productId");
            var number = $("#number").val();
            addShopping(productId,number);
        }else {
            //用户未登陆，显示登陆提示框
            $("#fade3").show();
            $("#MyDiv3").show();
        }
    })
    //为继续购物按钮绑定事件
    $(".b_buy").click(function (){
        $("#fade1").hide();
        $("#MyDiv1").hide();
    })
    //为关闭提示框按钮绑定事件
    $(".close").click(function (){
        var show_div = $(this).parent().parent().parent();
        var bg_div = $(this).parent().parent().parent().prev();
        $(show_div).hide();
        $(bg_div).hide();
    })

});

//查询购物车
function findShopping(){
    $.ajax({
        url:"/easybuy/order/findShopping",
        type:"post",
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success:function(result){
            shoppingProduct = result;
            showShopping(shoppingProduct);
        }
    })
}

//展示购物车
function showShopping(shoppingProduct) {
    var sum = 0;
    shoppingDom =
        "<div class=\"car_t\">购物车 [ <span>"+shoppingProduct.length+"</span> ]</div>" +
        "	<div class=\"car_bg\">" +
        "		<!--Begin 购物车已登录 Begin-->" +
        "		<ul class=\"cars\">";
    for (var i = 0;i < shoppingProduct.length;i++){
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

//向购物车添加商品
function addShopping(productId,number){
    $.ajax({
        url:"/easybuy/order/addShopping",
        type:"post",
        data:{"productId":productId,"number":number},
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success:function(result){
            if (result.flag){
                shoppingProduct = result.shoppingProduct;
                showShopping(shoppingProduct);
                $("#MyDiv1").show();
                $("#fade1").show();
            }else {
                alert("添加失败，购买数量不可超过商品库存");
            }
        }
    });
}

//购买数量验证
function numberVerify(number){
    if (!isNaN(number)){
        if (number < 1){
            $("#number").val(1);        //输入数据不能小于0
        }else {
            $("#number").val(number);   //数据正常
        }
    }else {
        $("#number").val(1);            //输入数据不是整数，强制变为1
    }
}