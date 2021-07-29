var userId=0;

jQuery(function(){
    get();
 })
 /**
  * 根据token拿用户id并且执行查询方法
  */
function get(){
    var token = localStorage.getItem("token");
    $("#add").show();
    $.ajax({
     url:"/easybuy/user/loginInfo",
     dataType: "json",
     data:{"token":token},
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
 * 
 * 根据用户id查询收货地址
 */
function findByUserId(userId){
    $.ajax({
       url:"/easybuy/UserAddress/tourist/findByUserId",
       dataType: "json",
       data:{"userId":userId},
       beforeSend:function (XMLHttpRequest){
        XMLHttpRequest.setRequestHeader("token",token);
    },
       success: function(result){
           $(result.length).each(function(i){
               for(var i=0;i<result.length;i++){
                $("#select").after(
                    "<div class="+"address"+">"+
                            "<div class="+"a_close"+"><a href="+"#"+" name="+result[i].id+" class='delete'><img src="+"images/a_close.png"+" /></a></div>"+
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
                                "<a href="+"#"+" style="+"color:#ff4e00;"+" name="+result[i].id+" class='isDefault'>设为默认</a>&nbsp; &nbsp; &nbsp; &nbsp; "+
                                "<a href="+"#"+" style="+"color:#ff4e00;"+" name="+result[i].id+" class='update'>编辑</a>&nbsp; &nbsp; &nbsp; &nbsp; "+
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
  $.ajax({
    url:"/easybuy/UserAddress/tourist/findByUserId",
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
    var address=sheng+shi+qu;
    if(address!="" && consignee!="" && email!="" && dianhua!="" && xaddress!="" && sheng!="" && shi!="" && qu!="市辖区"){
      if(email_v(email)){
        if(dianhua.length==11){
          $.ajax({
            url:"/easybuy/UserAddress/tourist/addUserAddress",
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
            url:"/easybuy/UserAddress/tourist/removeUserAddress",
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
  * 
  * 清除页面添加的标签的方法
  */
 function clean() {
  jQuery(".add_tab").remove();
  jQuery(".address").remove();
  jQuery(".aa").remove();
  $("#add").hide();
}
/**
 * 编辑地址的点击事件
 */
 $(document).on("click",".update",function name(){
   clean();
  var id=jQuery(this).attr("name");
  jQuery.ajax({
    url:"/easybuy/UserAddress/tourist/findById",
    dataType: "json",
    data:{"id":id},
    beforeSend:function (XMLHttpRequest){
      XMLHttpRequest.setRequestHeader("token",token);
  },
    success: function(result){
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
          url:"/easybuy/UserAddress/tourist/modifyUserAddress",
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
 * 返回的点击方法
 */
 $(document).on("click",".back",function name(){
  clean();
  get();
 })
 /**
  * 设默认的点击事件
  */
  $(document).on("click",".isDefault",function name() {
    var flag=confirm("确定要设置默认吗");
    if(flag){
    var id=jQuery(this).attr("name");
    $.ajax({
      url:"/easybuy/UserAddress/tourist/allisDefault",
      dataType: "text",
      data:{"userId":userId},
      beforeSend:function (XMLHttpRequest){
        XMLHttpRequest.setRequestHeader("token",token);
    },
      success: function(result){
        $.ajax({
          url:"/easybuy/UserAddress/isDefault",
          dataType: "text",
          data:{"id":id},
          success: function(result){
            alert("设置成功");
          }})

      }})
    }
  })
  /**
   * 设置默认的方法
   */
  function isDefault(id){

  }