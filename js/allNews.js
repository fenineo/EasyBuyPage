var pgIndex = 0;//当前页码
var pageCount = 0;//总页数
var list = null;
jQuery(function(){
    var newsId = window.location.search.substr(4);
    if(newsId!=""){
        clean();
        findbyid(newsId);
    }else{
        getAll(1);
    }
    // getAll(1);
 })
/**
 * 
 * 分页查询的方法
 * currentpage：当前页
 */
function getAll(pageIndex) {
    jQuery.ajax({
        url:"/easybuy/News/tourist/getPageNews",
        dataType: "json",
        data:{"pageIndex":pageIndex},
        success: function(result){
            pageCount = result.pageCount;
            pgIndex = result.pageIndex;
            list = result.list;
            //新闻列表拼接
            var newsTable = "";
            for(var i = 0;i < list.length;i++){
                if(list[i].title)
                newsTable +=
                "<tr>"+
                "   <td width="+"50%"+" class='look' name="+list[i].id+">"+list[i].title+"</td>"+
                "   <td width="+"30%"+">"+list[i].createTime+"</td>"+
                "</tr>"
            }
            jQuery("#first_tr").after(newsTable);
            pageShow(result);
        }
    })
 }
 
 /**
  * 
  * 清除页面添加的标签的方法
  */
  function clean() {
    jQuery("#selete").empty();
    jQuery("#pageBox").empty();
 }
 //分页
function page(pageIndex){
    if(pageIndex != pgIndex){
        jQuery("#first_tr").nextAll("tr").remove();
        jQuery("#pageBox").empty();
        getAll(pageIndex);
    }
}
 /**
 * 查询详情的方法
 */
function findbyid(id){
    jQuery.ajax({
        url:"/easybuy/News/tourist/findById",
        dataType: "json",
        data:{"id":id},
        success: function(result){
            jQuery("#selete").append(
            "<ul >\n"+
            "<li>新闻标题:"+result.title+"</li>\n"+ 
            "<li>新闻内容:"+result.content+"</li>\n"+   
            "<li>发布时间:"+result.createTime+"</li>\n"+      
            "</ul>"
            )
            jQuery("#pageBox").append("<input type='button' class='back'  value='返回列表'>")
        }
        
    })
}
 /**
  * 详情的点击事件
  */
 jQuery(document).on("click",".look",function name() {
    var id=jQuery(this).attr("name")
    clean();
    findbyid(id);
})
/**
 * 详情返回的点击事件
 */
 jQuery(document).on("click",".back",function name() {
    clean();
    window.location.href = "Member_Money_Charge.html";
})