var productDom = "";//商品展示节点
var categoryOneList = null;//商品一级分类集合
var categoryTwoList = null;//商品二级分类集合
var categoryThreeList = null;//商品三级分类集合
var productList = null;//商品集合

$(function (){

    $.ajax({
        url:"/easybuy/product/tourist/productList",
        type:"post",
        dataType:"JSON",
        success:function(result){
            categoryOneList = result.categoryOneList;
            categoryTwoList = result.categoryTwoList;
            categoryThreeList = result.categoryThreeList;
            productList = result.productList;
            for (var i = 0;i < categoryOneList.length;i++){
                //拼接一级分类
                productDom +=
                    "<div class=\"i_t mar_10\">" +
                    "    <span class=\"floor_num\">"+(i+1)+"F</span>" +
                    "    <span class=\"fl\">"+categoryOneList[i].name+"</span>"+
                    "        <span class=\"i_mores fr\">";

                for (var j = 0;j < categoryTwoList.length;j++){
                    if (categoryTwoList[j].parentId == categoryOneList[i].id){
                        //拼接二级分类
                        productDom +=
                            "<a href=\"#\">"+categoryTwoList[j].name+"</a>&nbsp; &nbsp; &nbsp;";
                    }
                }
                //拼接左侧轮播图
                productDom +=
                    "        </span>" +
                    "    </div>" +
                    "    <div class=\"content\">" +
                    "    <div class=\"fresh_left\">" +
                    "        <div class=\"fre_ban\">" +
                    "            <div id=\"imgPlay"+(i+1)+"\">" +
                    "                    <ul class=\"imgs\" id=\"actor"+(i+1)+"\">" +
                    "                        <li><a href=\"#\"><img src=\"images/fre_r.jpg\" width=\"211\" height=\"286\" /></a></li>" +
                    "                        <li><a href=\"#\"><img src=\"images/fre_r.jpg\" width=\"211\" height=\"286\" /></a></li>" +
                    "                        <li><a href=\"#\"><img src=\"images/fre_r.jpg\" width=\"211\" height=\"286\" /></a></li>" +
                    "                    </ul>" +
                    "                    <div class=\"prevf\">上一张</div>" +
                    "                    <div class=\"nextf\">下一张</div> " +
                    "                </div>   " +
                    "            </div>" +
                    "            <div class=\"fresh_txt\">" +
                    "            <div class=\"fresh_txt_c\">";
                //拼接三级分类
                for (var n = 0;n < categoryTwoList.length;n++){
                    if (categoryTwoList[n].parentId == categoryOneList[i].id){
                        for (var m = 0;m < categoryThreeList.length;m++){
                            if(categoryThreeList[m].parentId == categoryTwoList[n].id){
                                productDom +=
                                    "<a href=\"#\">"+categoryThreeList[m].name+"</a>";
                            }
                        }
                    }
                }
                productDom +=
                    "                </div>" +
                    "            </div>" +
                    "        </div>" +
                    "        <div class=\"fresh_mid\">" +
                    "        <ul>";
                //拼接商品
                var count = 0;
                for (var k = 0;k < productList.length;k++){
                    if (count == 6){break;}
                    if (productList[k].categoryLevel1Id == categoryOneList[i].id){
                        if(productList[k].isDelete == 0){
                            productDom +=
                                "            <li>" +
                                "                <div class=\"name\"><a href=\"Product.html?id="+productList[k].id+"\">"+productList[k].name+"</a></div>" +
                                "                <div class=\"price\">" +
                                "                <font>￥<span>"+productList[k].price+"</span></font> &nbsp; 库存："+productList[k].stock +
                                "                </div>" +
                                "                <div class=\"img\"><a href=\"Product.html?id="+productList[k].id+"\"><img src=\"images/fre_1.jpg\" width=\"185\" height=\"155\" /></a></div>" +
                                "            </li>";
                            count++;
                        }
                    }
                }
                productDom +=
                "        </ul>" +
                "        </div>" +
                "        <div class=\"fresh_right\">" +
                "        <ul>" +
                "            <li><a href=\"#\"><img src=\"images/fre_b1.jpg\" width=\"260\" height=\"220\" /></a></li>" +
                "                <li><a href=\"#\"><img src=\"images/fre_b2.jpg\" width=\"260\" height=\"220\" /></a></li>" +
                "            </ul>" +
                "        </div>" +
                "    </div>";
            }
            //将拼接好的节点放入页面
            $("#product_begin").after(productDom);
        }
    })
});

function sub(){
    var name = $("#search").val();
    var url = "CategoryList.html?name="+name;
    //编码字符串，接收时解码可以获取中文参数
    var searchUrl = encodeURI(url)
    window.location.href = searchUrl;
    return false;
}