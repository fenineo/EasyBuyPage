var userId=0;

jQuery(function(){
    get();
 })
 /**
  * 根据token拿用户id并且执行查询方法
  */
function get(){
    var token = localStorage.getItem("token");
    $.ajax({
     url:"/easybuy/user/loginInfo",
     dataType: "json",
     data:{"token":token},
     success: function(result){
        userId=result.id;
        findByUserId(userId);
     }
    });
}
/**
 * 
 * 根据用户id查询收货地址
 */
function findByUserId(userId){
    $.ajax({
       url:"/easybuy/UserAddress/findByUserId",
       dataType: "json",
       data:{"userId":userId},
       success: function(result){
           $(result.length).each(function(i){
               for(var i=0;i<result.length;i++){
                $("#select").after(
                    "<div class="+"address"+">"+
                            "<div class="+"a_close"+"><a href="+"#"+"><img src="+"images/a_close.png"+" /></a></div>"+
                            "<table border="+"0"+" class="+"add_t"+" align="+"center"+" style="+"width:98%; margin:10px auto;"+" cellspacing="+"0"+" cellpadding="+"0"+">"+
                              "<tr>"+
                                "<td align="+"right"+" width="+"80"+">收货人姓名：</td>"+
                                "<td>"+result[i].consignee+"</td>"+
                              "</tr>"+
                              "<tr>"+
                                "<td align="+"right"+">配送区域：</td>"+
                                "<td>"+result[i].address+"</td>"+
                              "</tr>"+
                              "<tr>"+
                                "<td align="+"right"+">详细地址：</td>"+
                                "<td>"+result[i].xaddress+"</td>"+
                              "</tr>"+
                              "<tr>"+
                                "<td align="+"right"+">手机：</td>"+
                                "<td>"+result[i].phone+"</td>"+
                              "</tr>"+
                              "<tr>"+
                                "<td align="+"right"+">电子邮箱：</td>"+
                                "<td>"+result[i].email+"</td>"+
                              "</tr>"+
                            "</table>"+
                            "<p align="+"right"+">"+
                                "<a href="+"#"+" style="+"color:#ff4e00;"+">设为默认</a>&nbsp; &nbsp; &nbsp; &nbsp; <a href="+"#"+" style="+"color:#ff4e00;"+">编辑</a>&nbsp; &nbsp; &nbsp; &nbsp; "+
                            "</p>"+
                        "</div>"
                    )
               }
           })
        }
      });
}
/**
 * 添加地址得点击事件
 */
$(document).on("click","#add",function name(){
    $("#aaa").after(
        "<table border="+"0"+" class="+"add_tab"+" style="+"width:930px;"+"  cellspacing="+"0"+" cellpadding="+"0"+">"+
              "<tr>"+
                "<td width="+"135"+" align="+"right"+">配送地区</td>"+
                "<td colspan="+"3"+" style="+"font-family:'宋体';"+">"+
                    "<select name="+"sheng"+" id="+"sheng"+"></select>"+
                    "<select name="+"shi"+" id="+"shi"+"></select>"+
                    "<select name="+"qu"+" id="+"qu"+"></select>"+
                    "（必填）"+
                "</td>"+
              "</tr>"+
              "<tr>"+
                "<td align="+"right"+">收货人姓名</td>"+
                "<td style="+"font-family:'宋体'; "+"><input type="+"text"+"  class="+"add_consignee"+"/>（必填）</td>"+
                "<td align="+"right"+">电子邮箱</td>"+
                "<td style="+"font-family:'宋体';"+"><input type="+"text"+" class="+"add_email"+" />（必填）</td>"+
              "</tr>"+
              "<tr>"+
                "<td align="+"right"+">详细地址</td>"+
                "<td style="+"font-family:'宋体';"+"><input type="+"text"+" class="+"add_xaddress"+" />（必填）</td>"+
                "<td align="+"right"+">手机</td>"+
                "<td style="+"font-family:'宋体';"+"><input type="+"text"+" class="+"add_phone"+"/>（必填）</td>"+
              "</tr>"+
            "</table>"+
           	"<p align="+"right"+">"+
            	"<a href="+"#"+">删除</a>&nbsp; &nbsp; <a href="+"#"+" class="+"add_b"+"  id="+"addAffirm"+">确认添加</a>"+
            "</p>" 
            

    )
    if($("select[name='sheng']").length>0){
        new PCAS("sheng","shi","qu","","","");
    }
})
$(document).on("click","#addAffirm",function name(){
    var sheng=$("#sheng").val();
    var shi=$("#shi").val();
    var qu=$("#qu").val();
    var consignee=$(".add_consignee").val();
    var email=$(".add_email").val();
    var dianhua=$(".add_phone").val();
    var xaddress=$(".add_xaddress").val();
    alert(sheng);
    alert(shi);
    alert(qu);
    alert(consignee);
    alert(email);
    alert(dianhua);
    alert(xaddress);

    
})
