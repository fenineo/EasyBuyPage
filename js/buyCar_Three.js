

$(function (){
    //获取订单id
    var orderId = window.location.search.substr(4);

    $("#toPay").click(function (){
        toAlipay(orderId);
    })

    findOrderInfo(orderId);
});

//请求支付宝支付,传入订单号参数
function toAlipay(orderId){
    $.ajax({
        url:"/easybuy/order/alipay",
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
//根据订单id查询订单信息并展示到页面
function findOrderInfo(orderId){
    $.ajax({
        url:"/easybuy/order/findOrderInfo",
        type:"post",
        data:{"orderId":orderId},
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success:function(result){
            $("#serialNumber").text(result.serialNumber);
            $("#cost").text(result.cost);
        }
    })
}