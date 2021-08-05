var pgIndex = 0;//当前页码
var pageCount = 0;//总页数
var userId=0;
jQuery(function(){
    getAll();
 })
 /**
  * 分页查询
  */
  function getAll(pageIndex) {
    var isDelete=1;
   jQuery.ajax({
       url:"/easybuy/product/admin/getPageProduct",
       dataType: "json",
       data:{"pageIndex":pageIndex,"isDelete":isDelete},
       beforeSend:function (XMLHttpRequest){
           XMLHttpRequest.setRequestHeader("token",token);
       },
       success: function(result){
           pageCount = result.pageCount;
           pgIndex = result.pageIndex;
           list = result.list;
           var Product="";
           for(var i=0;i<list.length;i++){
               Product +="<tr>"+
               "   <td width="+"25%"+" class='look' name="+list[i].id+">"+list[i].name+"</td>"+
               "   <td width="+"25%"+" class='look' name="+list[i].id+"><img src='/img/"+list[i].fileName+"' width="+80+" height="+50+"/></td>"+
               "   <td width="+"10%"+" class='look' name="+list[i].id+">"+list[i].price+"</td>"+
               "   <td width="+"10%"+">"+list[i].stock+"</td>"+
               "<td width="+"20%"+"><input type='button' class='update' name="+list[i].id+" value='上架'>"+
               "</tr>";
           }
           jQuery("#first_tr").after(Product);
           //分页
           pageShow(result);

       }})}
       //分页
function page(pageIndex){
   if(pageIndex != pgIndex){
       jQuery("#first_tr").nextAll("tr").remove();
       jQuery("#pageBox").empty();
       getAll(pageIndex);
   }
}
$(document).on("click",".update",function name(){
    var id=$(this).attr("name");
    var flag=confirm("确定要上架吗");
    if(flag){
        $.ajax({
            url:"/easybuy/product/admin/removeProduct",
            dataType: "text",
            data:{"id":id},
            beforeSend:function (XMLHttpRequest){
                XMLHttpRequest.setRequestHeader("token",token);
            },
            success: function(result){
                alert("上架成功");
                window.location.href = "/Member_Packet.html";
            }
            })
      }
})