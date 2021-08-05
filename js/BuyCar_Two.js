var token = localStorage.getItem("token");
var userId=0;
var falg=false;
var isDefaultId;
var shoppingProduct = null;
var sum = 0;//总价

$(function(){

    $("#bbb").hide();
    get();

    //查询购物车并展示
    shoppingShow();
    //点击确认订单，请求添加订单
    $("#toPay").click(function (){
        var sum = $("#amountPayable").text();   //总消费
        //获取用户地址
        var address = $("input:radio:checked").parent().parent().next().next().children("td:eq(1)").text();
        if (address == "" || address == null){
            alert("请选择收货地址");
        }else {
            addOrder(address,sum);
        }
    })
 });

//根据token查询购物车并展示
function shoppingShow(){
    $.ajax({
        url:"/easybuy/order/regist/findShopping",
        type:"post",
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success:function(result){
            //保存购物车中的商品集合
            shoppingProduct = result;
            //存放总价的变量
            sum = 0;
            //展示商品的节点
            var productDom = "";
            for (var i = 0;i < shoppingProduct.length;i++){
                productDom +=
                    "              <tr>" +
                    "                <td>" +
                    "                    <div class=\"c_s_img\"><img src=\"images/c_1.jpg\" width=\"73\" height=\"73\" /></div>" +
                    "                    "+shoppingProduct[i].name+"" +
                    "                </td>" +
                    "                <td align=\"center\">"+shoppingProduct[i].price+"</td>" +
                    "                <td align=\"center\">"+shoppingProduct[i].stock+"</td>" +
                    "                <td align=\"center\" style=\"color:#ff4e00;\">"+(shoppingProduct[i].price*shoppingProduct[i].stock)+"</td>" +
                    "              </tr>";
                //拼接商品节点的同时顺便计算总价
                sum += (shoppingProduct[i].price*shoppingProduct[i].stock)
            }
            //页面插入商品展示节点
            $("#productBegin").after(productDom);
            //页面设置商品总价
            $(".sum").text("商品总价：￥"+sum);
            //页面设置应付金额
            $("#amountPayable").text(sum+15);
        }
    })
}

//请求添加订单
function addOrder(address,sum){
    $.ajax({
        url:"/easybuy/order/regist/addOrder",
        type:"post",
        data:{"address":address,"sum":sum},
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success:function(result){
            if (result.flag){
                window.location.href = "BuyCar_Three.html?id="+result.orderId;
            }else {
                alert("生成订单失败，请检查订单信息");
            }
        }
    });
}

 /**
  * 根据token拿用户id并且执行查询方法
  */
function get(){
    $("#add").show();
    $.ajax({
      url:"/easybuy/user/regist/loginInfo",
      type:"post",
      beforeSend:function (XMLHttpRequest){
       XMLHttpRequest.setRequestHeader("token",token);
   },
      success: function(result){
         userId=result.id;
         findByUserId(userId);
      }
     });
}
/**
 * 查询默认地址
 */
function findByUserId(userId){
    $.ajax({
        url:"/easybuy/UserAddress/regist/findByUserId",
        dataType: "json",
        data:{"userId":userId},
        beforeSend:function (XMLHttpRequest){
          XMLHttpRequest.setRequestHeader("token",token);
      },
        success: function(result){
            for(var i=0;i<result.length;i++){
                if(result[i].isDefault=="1"){
                    var falg=true;
                    var isDefaultId=i;
                }
            }
            if(falg==true){
                var dom =
    "<table border=\"0\" class=\"peo_tab\" style=\"width:1110px;\" cellspacing=\"0\" cellpadding=\"0\">" +
    "                <tr><td><input type=\"radio\" name=\"abc\"></td></tr>" +
    "              <tr>" +
    "                <td class=\"p_td\" width=\"160\">收件人</td>" +
    "                <td width=\"395\">"+result[isDefaultId].consignee+"</td>" +
    "                <td class=\"p_td\" width=\"160\">电子邮件</td>" +
    "                <td width=\"395\">"+result[isDefaultId].email+"</td>" +
    "              </tr>" +
    "              <tr>" +
    "                <td class=\"p_td\">详细地址</td>" +
    "                <td>"+result[isDefaultId].address+result[isDefaultId].xaddress+"</td>" +
    "                <td class=\"p_td\">手机</td>" +
    "                <td>"+result[isDefaultId].phone+"</td>" +
    "              </tr>" +
    "<p align="+"right"+">"+
                                "<a href="+"#"+" style="+"color:#ff4e00;"+" name="+result[isDefaultId].id+" class='update'>修改</a>&nbsp; &nbsp; &nbsp; &nbsp; "+
                                "<a href="+"#"+" style="+"color:#ff4e00;"+" name="+result[isDefaultId].id+" class='delete'>删除</a>&nbsp; &nbsp; &nbsp; &nbsp; "+
                            "</p>"+
    "            </table>"
                $("#select").after(dom);
                $("#bbb").show();
            }else{
                selectAll(result);
            }
        }
    })
}
/**
 * 查询所有地址的方法
 */
function selectAll(result){
    for(var i=0;i<result.length;i++){
        var dom =
        "<table border=\"0\" class=\"peo_tab\" style=\"width:1110px;\" cellspacing=\"0\" cellpadding=\"0\">" +
        "                <tr><td><input type=\"radio\" name=\"abc\"></td></tr>" +
        "              <tr>" +
        "                <td class=\"p_td\" width=\"160\">收件人</td>" +
        "                <td width=\"395\">"+result[i].consignee+"</td>" +
        "                <td class=\"p_td\" width=\"160\">电子邮件</td>" +
        "                <td width=\"395\">"+result[i].email+"</td>" +
        "              </tr>" +
        "              <tr>" +
        "                <td class=\"p_td\">详细地址</td>" +
        "                <td>"+result[i].address+result[i].xaddress+"</td>" +
        "                <td class=\"p_td\">手机</td>" +
        "                <td>"+result[i].phone+"</td>" +
        "              </tr>" +
        "<div id="+"sss"+">"+
        "<p align="+"right"+">"+
                    "<a href="+"#"+" style="+"color:#ff4e00;"+" name="+result[i].id+" class='update'>修改</a>&nbsp; &nbsp; &nbsp; &nbsp; "+
                    "<a href="+"#"+" style="+"color:#ff4e00;"+" name="+result[i].id+" class='delete'>删除</a>&nbsp; &nbsp; &nbsp; &nbsp; "+
                "</p>"+
                "</div>"+
        "            </table>"
                    $("#select").after(dom);
    }
}
/**
  * 
  * 清除页面添加的标签的方法
  */
 function clean() {
    jQuery(".add_tab").remove();
    jQuery(".peo_tab").remove();
    jQuery(".aa").remove();
    $(".update").empty();
    $(".delete").empty();
    jQuery("#sss").remove();
    $("#add").hide();
  }

/**
 * 添加地址得点击事件
 */
 $(document).on("click","#add",function name(){
    $.ajax({
      url:"/easybuy/UserAddress/regist/findByUserId",
      dataType: "json",
      data:{"userId":userId},
      beforeSend:function (XMLHttpRequest){
        XMLHttpRequest.setRequestHeader("token",token);
    },
      success: function(result){
        if(result.length<3){
          clean();
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
                      "<td style="+"font-family:'宋体'; "+"><input type="+"text"+"  class="+"add_consignee"+" id="+"add_consignee"+"/>（必填）</td>"+
                      "<td align="+"right"+">电子邮箱</td>"+
                      "<td style="+"font-family:'宋体';"+"><input type="+"text"+" class="+"add_email"+" id="+"add_email"+"/>（必填）</td>"+
                    "</tr>"+
                    "<tr>"+
                      "<td align="+"right"+">详细地址</td>"+
                      "<td style="+"font-family:'宋体';"+"><input type="+"text"+" class="+"add_xaddress"+" id="+"add_xaddress"+"/>（必填）</td>"+
                      "<td align="+"right"+">手机</td>"+
                      "<td style="+"font-family:'宋体';"+"><input type="+"number"+" class="+"add_phone"+"/ id="+"add_phone"+">（必填）</td>"+
                    "</tr>"+
                  "</table>"+
                   "<p align="+"right"+" class="+"aa"+">"+
                    "<a href="+"#"+" class="+"back"+">返回</a>&nbsp; &nbsp; <a href="+"#"+" class="+"add_b"+"  id="+"addAffirm"+">确认添加</a>"+
                  "</p>" 
                  
      
          )
          if($("select[name='sheng']").length>0){
              new PCAS("sheng","shi","qu","","","");
          }
        }else{
          alert("超过数量，请删除后再添加");
        }
      }
    })
      
  })
  
/**
 * 确认添加得方法
 */
$(document).on("click","#addAffirm",function name(){
    var sheng=$("#sheng").val();
    var shi=$("#shi").val();
    var qu=$("#qu").val();
    var consignee=$(".add_consignee").val();
    var email=$(".add_email").val();
    var dianhua=$("#add_phone").val();
    var xaddress=$(".add_xaddress").val();
    var address=sheng+","+shi+","+qu;
    if(address!="" && consignee!="" && email!="" && dianhua!="" && xaddress!="" && sheng!="" && shi!="" && qu!="市辖区"){
      if(email_v(email)){
        if(dianhua.length==11){
          $.ajax({
            url:"/easybuy/UserAddress/regist/addUserAddress",
            dataType: "text",
            data:{"userId":userId,"address":address,"consignee":consignee,"email":email,"phone":dianhua,"xaddress":xaddress},
            beforeSend:function (XMLHttpRequest){
              XMLHttpRequest.setRequestHeader("token",token);
          },
            success: function(result){
              alert("添加成功");
              clean();
              get();
            }})
        }else{
          alert("手机格式不正确")
        }
      }
    }else{
      alert("请填写所有必填项");
    }
})

//邮箱验证
function email_v(email){
    // var emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    // if(emailReg.test(email)){
    //     if(email == "" || email == null){
    //       alert("正确");
    //       return true;
    //     }
    //     }else{
    //       alert("邮箱格式不正确")
    //       return false;
    // } }
    var myreg = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    if(!myreg.test(email)){
      alert("请输入正确邮箱地址");
      return false;
    }else{
      return true;
    }
  }
  
/**
 * 返回的点击方法
 */
 $(document).on("click",".back",function name(){
  clean();
  get();
 })
  
/**
 * 删除的点击事件
 */
 $(document).on("click",".delete",function name() {
    var id=jQuery(this).attr("name");
    remove(id);
  })
  
/**
 * 
 * 删除的方法
 */
function remove(id){
    var flag=confirm("确定要删除吗");
    if(flag){
        jQuery.ajax({
            url:"/easybuy/UserAddress/regist/removeUserAddress",
            dataType: "text",
            data:{"id":id},
            beforeSend:function (XMLHttpRequest){
              XMLHttpRequest.setRequestHeader("token",token);
          },
            success: function(result){
              alert("删除成功");
              clean();
              get();
            }  
        })
    }
}

/**
 * 编辑地址的点击事件
 */
 $(document).on("click",".update",function name(){
    clean();
   var id=jQuery(this).attr("name");
   jQuery.ajax({
     url:"/easybuy/UserAddress/regist/findById",
     dataType: "json",
     data:{"id":id},
     beforeSend:function (XMLHttpRequest){
      XMLHttpRequest.setRequestHeader("token",token);
  },
     success: function(result){
      var ress=result.address;
      var arr=ress.split(",");
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
                       "<td align="+"right"+" >收货人姓名</td>"+
                       "<td style="+"font-family:'宋体'; "+"><input type="+"text"+"  class="+"add_consignee"+" id="+"add_consignee"+" value="+result.consignee+" />（必填）</td>"+
                       "<td align="+"right"+">电子邮箱</td>"+
                       "<td style="+"font-family:'宋体';"+"><input type="+"text"+" class="+"add_email"+" id="+"add_email"+" value="+result.email+">（必填）</td>"+
                     "</tr>"+
                     "<tr>"+
                       "<td align="+"right"+">详细地址</td>"+
                       "<td style="+"font-family:'宋体';"+"><input type="+"text"+" class="+"add_xaddress"+" id="+"add_xaddress"+" value="+result.xaddress+">（必填）</td>"+
                       "<td align="+"right"+">手机</td>"+
                       "<td style="+"font-family:'宋体';"+"><input type="+"number"+" class="+"add_phone"+"/ id="+"add_phone"+" value="+result.phone+">（必填）</td>"+
                     "</tr>"+
                   "</table>"+
                   "<p align="+"right"+" class="+"aa"+">"+
                     "<a href="+"#"+" class="+"back"+">返回</a>&nbsp; &nbsp; <a href="+"#"+" class="+"add_b"+"  id="+"updateAffirm"+" name="+result.id+">确认修改</a>"+
                   "</p>" 
           )
           if($("select[name='sheng']").length>0){
               new PCAS("sheng","shi","qu","","","");
           }
           
          $("#shi").empty();
          $("#shi").append("<option value="+arr[1]+">"+arr[1]+"</option>");
          $("#qu").empty();
          $("#qu").append("<option value="+arr[2]+">"+arr[2]+"</option>");
          $("#sheng").first("option").val(arr[0]);
     }  
 })
 })
 /**
  * 确认修改的方法
  */
  $(document).on("click","#updateAffirm",function name(){
   var id=jQuery(this).attr("name");
   var sheng=$("#sheng").val();
   var shi=$("#shi").val();
   var qu=$("#qu").val();
   var consignee=$(".add_consignee").val();
   var email=$(".add_email").val();
   var dianhua=$("#add_phone").val();
   var xaddress=$(".add_xaddress").val();
   var address=sheng+shi+qu;
   if(address!="" && consignee!="" && email!="" && dianhua!="" && xaddress!="" && sheng!="" && shi!="" && qu!="市辖区"){
     if(email_v(email)){
       if(dianhua.length==11){
         $.ajax({
           url:"/easybuy/UserAddress/regist/modifyUserAddress",
           dataType: "text",
           data:{"id":id,"address":address,"consignee":consignee,"email":email,"phone":dianhua,"xaddress":xaddress},
           beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
           success: function(result){
            alert("修改成功");
            clean();
            get();
           }})
       }else{
         alert("手机格式不正确")
       }
     }
   }else{
     alert("请填写所有必填项");
   }
 })
 /**
  * 查询所有地址的点击事件
  */
 $(document).on("click","#selectOther",function name(){
    clean();
    $("#bbb").hide();
    $.ajax({
        url:"/easybuy/UserAddress/regist/findByUserId",
        dataType: "json",
        data:{"userId":userId},
        beforeSend:function (XMLHttpRequest){
          XMLHttpRequest.setRequestHeader("token",token);
      },
        success: function(result){
            selectAll(result);
        }})
 })