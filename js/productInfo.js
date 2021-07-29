var productId = 0;
var product = null;
var path = "";

$(function (){
    var productId = window.location.search.substr(4);
    $(".addShopping").attr("productId",productId);

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
            $("#product_price").text("￥"+product.price);
        }
    })
})