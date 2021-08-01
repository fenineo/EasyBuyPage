var token = localStorage.getItem("token");
var shoppingProduct = null;//商品集合
var productId = 0;//删除商品id
var pageIndex = 1;//当前页
var pageSize = 5;//页容量
var pageCount = 0;//总页数
var totalCount = 0;//总记录数

$(function (){
    //查询购物车
    findShoppingProduct();
    //确认删除按钮点击事件
    $(".b_sure").click(function (){
        removeShopping(productId);//购物车删除商品
    })
    //取消删除按钮点击事件
    $(".b_buy").click(function (){
        $("#fade").hide();
        $("#MyDiv").hide();
    })
    $("#toPay").click(function (){
        if (shoppingProduct == null || shoppingProduct.length < 1){
            alert("购物车还是空的，先去添加喜欢的宝贝吧。")
        }else {
            window.location.href = "BuyCar_Two.html";
        }
    })
});

//购买数量验证
function numberVerify(number,dom){
    if (!isNaN(number)){
        if (number < 1){
            //输入数据不能小于0
            number = 1;
            $(dom).val(1);
        }else {
            //数据正常
            $(dom).val(number);
        }
    }else {
        //输入数据不是整数，强制变为1
        number = 1;
        $(dom).val(1);
    }
    subtotal(number,dom);
}
//计算商品小计
function subtotal(number,dom){
    var _productId = $(dom).attr("productId");
    modifyShopping(_productId,number);
    //计算小计并展示到页面
    var price = parseFloat($(dom).parent().parent().prev().text().replace("￥",""));
    var subtol = toDecimal2(numMulti(price,number));
    $(dom).parent().parent().next().text("￥"+subtol);
}
//计算商品总价
function sum(shoppingProduct){
    var sumPrice = 0;//总价
    for (var i = 0;i < shoppingProduct.length;i++){
        sumPrice += numMulti(shoppingProduct[i].price,shoppingProduct[i].stock);
    }
    $("#sumPrice").text("￥"+toDecimal2(sumPrice));
}
//查询购物车
function findShoppingProduct(){
    $.ajax({
        url:"/easybuy/order/findShopping",
        type:"post",
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success:function(result){
            shoppingProduct = result;
            showShoppingProduct(shoppingProduct)
        }
    })
}
// 展示购物车
function showShoppingProduct(shoppingProduct){
    var shoppingDom = "";
    for (var i = 0;i<shoppingProduct.length;i++){
        var productId = shoppingProduct[i].id;
        var productName = shoppingProduct[i].name;
        var productPrice = shoppingProduct[i].price;
        var productStock = shoppingProduct[i].stock;
        var subtol = toDecimal2(numMulti(productPrice,productStock));
        shoppingDom +=
            "		<tr class=\"product_tr\">" +
            "			<td>" +
            "				<div class=\"c_s_img\"><img src=\"images/c_1.jpg\" width=\"73\" height=\"73\" /></div>" +
            "					"+productName+"" +
            "			</td>" +
            "			<td align=\"center\" id=\"abc\">￥"+productPrice+"</td>" +
            "			<td align=\"center\">" +
            "				<div class=\"c_num\">" +
            "					<input type=\"button\" class=\"car_btn_1\" />" +
            "					<input type=\"text\" productId=\""+productId+"\" value=\""+productStock+"\" class=\"car_ipt number\" />" +
            "					<input type=\"button\" class=\"car_btn_2\" />" +
            "				</div>" +
            "			</td>" +
            "			<td align=\"center\" class=\"subtotal\" style=\"color:#ff4e00;\">￥"+subtol+"</td>" +
            "			<td align=\"center\"><a onclick=\"removeClick("+productId+")\" class=\"removeShopping\">删除</a></td>" +
            "		</tr>";
    }
    $("#productEnd").before(shoppingDom);

    sum(shoppingProduct);
    //为减号按钮动态绑定事件
    $(".car_btn_1").on("click",function (){
        var number = $(this).next().val();
        number--;
        numberVerify(number,$(this).next());
    });
    //为加号按钮动态绑定事件
    $(".car_btn_2").on("click",function (){
        var number = $(this).prev().val();
        number++;
        numberVerify(number,$(this).prev());
    });
    //为数量框动态绑定value值变化事件
    $(".number").on("input propertychange",function (){
        var number = $(this).val();
        numberVerify(number,$(this));
    })
}
//修改购物车中商品的数量
function modifyShopping(productId,number){
    $.ajax({
        url:"/easybuy/order/modifyShopping",
        type:"post",
        data:{"productId":productId,"number":number},
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success:function(result){
            shoppingProduct = result.shoppingProduct;
            sum(shoppingProduct);
            showShopping(shoppingProduct);
        }
    });
}
//删除购物车中的商品
function removeShopping(productId){
    $.ajax({
        url:"/easybuy/order/removeShopping",
        type:"post",
        data:{"productId":productId},
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success:function(result){
            if (result.flag){
                shoppingProduct = result.shoppingProduct;
                $("#fade").hide();
                $("#MyDiv").hide();
                $("#productEnd").prevAll(".product_tr").remove();
                showShoppingProduct(shoppingProduct);
            }else {
                alert("删除失败");
            }
        }
    });
}
//删除按钮点击事件
function removeClick(id){
    productId = id
    $("#fade").show();
    $("#MyDiv").show();
}


//强制保留2位小数，如：2，会在2后面补上00.即2.00
function toDecimal2(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(x*100)/100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}

/* 避免乘法运算时小数点后产生多位数和计算精度损失的函数 */
function numMulti(num1,num2){
    var baseNum = 0;
    try{
        baseNum += num1.toString().split(".")[1].length;
    }catch(e){
    }
    try{
        baseNum += num2.toString().split(".")[1].length;
    }catch(e){
    }
    return Number(num1.toString().replace(".",""))*Number(num2.toString().replace(".",""))/Math.pow(10,baseNum);
}

/* 避免加法运算小数点后产生多位数和计算精度损失的函数 */
function numAdd(num1,num2){
    var baseNum,baseNum1 = 0,baseNum2 = 0;
    try{
        baseNum1 += num1.toString().split(".")[1].length;
    }catch(e){
        baseNum1 = 0;
    }
    try{
        baseNum2 += num2.toString().split(".")[1].length;
    }catch(e){
        baseNum2 = 0;
    }
    baseNum = Math.pow(10,Math.max(baseNum1,baseNum2));
    return (num1*baseNum+num2*baseNum)/baseNum;
}