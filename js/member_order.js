var token = localStorage.getItem("token");
var pgIndex = 0;    //当前页码

$(function (){
    findOrderPageByUser(1);
});

//根据用户分页查询订单信息
function findOrderPageByUser(pageIndex){
    $.ajax({
        url:"/easybuy/order/regist/findOrderPageByUser",
        type:"post",
        data:{"pageIndex":pageIndex},
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success:function(result){
            pgIndex = pageIndex;
            var orderList = result.orderPage.list;
            var orderDetailVoList = result.orderDetailVoList;
            //拼接订单信息
            var orderDom = "";
            for(var i = 0;i < orderList.length;i++){
                orderDom +=
                    "<p class=\"pcss\">" +
                    "	<span>用户名"+orderList[i].loginName+"</span>" +
                    "	<span>订单号:"+orderList[i].serialNumber+"</span>" +
                    "	<span>地址:"+orderList[i].userAddress+"</span>" +
                    "	<span>总金额：￥"+orderList[i].cost+"</span>";

                if(orderList[i].statePay == 1){
                    orderDom +=
                        "   <span>支付状态:&nbsp;已支付</span>" +
                        "</p>";
                }else {
                    orderDom +=
                        "   <span>支付状态:未支付<a href=\"#\" onclick=\"toAlipay("+orderList[i].id+")\">&nbsp;&nbsp;去支付</a></span>" +
                        "</p>";
                }
                //拼接订单商品详细信息表格
                orderDom +=
                    "<table border=\"0\" class=\"order_tab\" style=\"width:930px; text-align:center; margin-bottom:30px;\" cellspacing=\"0\" cellpadding=\"0\">" +
                    "	<tr>" +
                    "		<td width=\"25%\">商品名称</td>" +
                    "		<td width=\"30%\">商品图片</td>" +
                    "		<td width=\"20%\">数量</td>" +
                    "		<td width=\"25%\">价格</td>" +
                    "	</tr>";

                //遍历订单详细商品集合，拼接订单详细商品信息
                for(var j = 0;j < orderDetailVoList.length;j++){
                    if (orderDetailVoList[j].orderId == orderList[i].id){
                        orderDom +=
                            "	<tr>" +
                            "		<td>"+orderDetailVoList[j].name+"</td>" +
                            "		<td><img width=\"85px\" height=\"50px\" src='/img/"+orderDetailVoList[j].fileName+"'/></td>" +
                            "		<td>"+orderDetailVoList[j].quantity+"</td>" +
                            "		<td>￥"+orderDetailVoList[j].cost+"</td>" +
                            "	</tr>";
                    }
                }
                //表格收尾
                orderDom +=
                    "</table>";
            }
            //拼接到页面
            $("#myOrder").after(orderDom);

            //引用pageBean.js的分页框展示方法
            pageShow(result.orderPage);
        }

    });
}

//分页
function page(pageIndex){
    if(pageIndex != pgIndex){
        $("#myOrder").nextAll("p,table").remove();
        $("#pageBox").empty();
        findOrderPageByUser(pageIndex)
    }
}

//请求支付宝支付,传入订单号参数
function toAlipay(orderId){
    $.ajax({
        url:"/easybuy/order/regist/alipay",
        type:"post",
        data:{"orderId":orderId},
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success:function(result){
            //跳转支付页面
            $('body').empty();
            $('body').html(result);
        }
    })
}