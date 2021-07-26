// var productInfoDom =
//     "    <div class=\"postion\">" +
//     "        <span class=\"fl\">全部 > 美妆个护 > 香水 > 迪奥 > 迪奥真我香水</span>" +
//     "    </div>" +
//     "<div class=\"content\">" +
//     "    <div id=\"tsShopContainer\">" +
//     "        <div id=\"tsImgS\"><a href=\"images/p_big.jpg\" title=\"Images\" class=\"MagicZoom\" id=\"MagicZoom\"><img src=\"images/p_big.jpg\" width=\"390\" height=\"390\" /></a></div>" +
//     "        <img class=\"MagicZoomLoading\" width=\"16\" height=\"16\" src=\"images/loading.gif\" alt=\"Loading...\" />" +
//     "    </div>" +
//     "    <div class=\"pro_des\">" +
//     "        <div class=\"des_name\">" +
//     "            <p>Dior/迪奥 真我香水EDP 克丽丝汀迪奥 全新 30ml</p>" +
//     "            “开业巨惠，北京专柜直供”，不光低价，“真”才靠谱！" +
//     "        </div>" +
//     "        <div class=\"des_price\">" +
//     "            本店价格：<b>￥589</b><br />" +
//     "        </div>" +
//     "        <div class=\"des_choice\">" +
//     "            <span class=\"fl\">型号选择：</span>" +
//     "            <ul>" +
//     "                <li class=\"checked\">30ml<div class=\"ch_img\"></div></li>" +
//     "                <li>50ml<div class=\"ch_img\"></div></li>" +
//     "                <li>100ml<div class=\"ch_img\"></div></li>" +
//     "            </ul>" +
//     "        </div>" +
//     "        <div class=\"des_choice\">" +
//     "            <span class=\"fl\">颜色选择：</span>" +
//     "            <ul>" +
//     "                <li>红色<div class=\"ch_img\"></div></li>" +
//     "                <li class=\"checked\">白色<div class=\"ch_img\"></div></li>" +
//     "                <li>黑色<div class=\"ch_img\"></div></li>" +
//     "            </ul>" +
//     "        </div>" +
//     "        <div class=\"des_share\">" +
//     "            <div class=\"d_sh\">" +
//     "                分享" +
//     "                <div class=\"d_sh_bg\">" +
//     "                    <a href=\"#\"><img src=\"images/sh_1.gif\" /></a>" +
//     "                    <a href=\"#\"><img src=\"images/sh_2.gif\" /></a>" +
//     "                    <a href=\"#\"><img src=\"images/sh_3.gif\" /></a>" +
//     "                    <a href=\"#\"><img src=\"images/sh_4.gif\" /></a>" +
//     "                    <a href=\"#\"><img src=\"images/sh_5.gif\" /></a>" +
//     "                </div>" +
//     "            </div>" +
//     "            <div class=\"d_care\"><a onclick=\"ShowDiv('MyDiv','fade')\">关注商品</a></div>" +
//     "        </div>" +
//     "        <div class=\"des_join\">" +
//     "            <div class=\"j_nums\">" +
//     "                <input type=\"text\" value=\"1\" name=\"\" class=\"n_ipt\" />" +
//     "                <input type=\"button\" value=\"\" onclick=\"addUpdate(jq(this));\" class=\"n_btn_1\" />" +
//     "                <input type=\"button\" value=\"\" onclick=\"jianUpdate(jq(this));\" class=\"n_btn_2\" />" +
//     "            </div>" +
//     "            <span class=\"fl\"><a onclick=\"ShowDiv_1('MyDiv1','fade1')\"><img src=\"images/j_car.png\" /></a></span>" +
//     "        </div>" +
//     "    </div>" +
//     "    <div class=\"s_brand\">" +
//     "        <div class=\"s_brand_img\"><img src=\"images/sbrand.jpg\" width=\"188\" height=\"132\" /></div>" +
//     "        <div class=\"s_brand_c\"><a href=\"#\">进入品牌专区</a></div>" +
//     "    </div>" +
//     "</div>"

var productId = 0;
var product = null;
var path = "";

$(function (){
    var productId = window.location.search.substr(4);

    $.ajax({
        url:"/easybuy/product/productInfo",
        type:"post",
        data:{"id":productId},
        dataType:"JSON",
        success:function(result){
            path = result.path;
            product = result.product;
            $("#path").text(path);
            $("#product_name").text(product.name);
            $("#product_description").text(product.description);
            $("#product_price").text("￥"+product.price);
        }
    })
})