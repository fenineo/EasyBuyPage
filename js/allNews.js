
jQuery(function(){
    getAll();
 })
/**
 * 
 * 查询的方法
 * currentpage：当前页
 */
function getAll(currentpage) {
    jQuery.ajax({
        url:"/easybuy/getPageNews",
        dataType: "json",
        data:{"currentpage":currentpage},
        success: function(result){
            jQuery(result.list).each(function (i) {
                var news=result.list[i];
                jQuery("#selete").append(
                "<tr >\n"+
                "<td width="+"50%"+" class='look' name="+news.id+">"+news.title+"</td>\n"+
                "<td width="+"30%"+">"+news.createTime+"</td>\n"+
                "<td width="+"20%"+"><input type='button' class='update' name="+news.id+" value='修改'><input type='button' class='delete' name="+news.id+" value='删除'></td>\n"+
                "</tr>"
                );
            })
            for(var i=0;i<result.pageCount;i++){
                jQuery("#page").append("<div class='page'>"+(result.pageCount-i)+"</div>");
            }
        }
    })
 }
 /**
 * 查询详情的方法
 */
function findbyid(id){
    jQuery.ajax({
        url:"/easybuy/findById",
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
            jQuery("#page").append("<input type='button' class='back'  value='返回'>")
        }
        
    })
}
/**
 * 删除新闻的方法
 */
function remove(id) {
    var flag=confirm("确定要删除吗");
    if(flag){
        jQuery.ajax({
            url:"/easybuy/removeNews",
            dataType: "json",
            data:{"id":id},
            success: function(result){
                
            }
            
        })
    }
}
 /**
  * 
  * 清除页面添加的标签的方法
  */
 function clean() {
    jQuery("#selete").empty();
    jQuery("#page").empty();
 }
 /**
  * 修改的点击事件
  */
 jQuery(document).on("click",".update",function name() {
    clean();
     var abc=jQuery(this).attr("name")
     alert(abc);
 })
 /**
  * 详情的点击事件
  */
 jQuery(document).on("click",".look",function name() {
    var abc=jQuery(this).attr("name")
    clean();
    findbyid(abc);
})
/**
 * 删除的点击事件
 */
jQuery(document).on("click",".delete",function name() {
    var abc=jQuery(this).attr("name")
    alert(abc);
})
 //分页查询的点击事件
 jQuery(document).on("click",".page",function name() {
    var abc=jQuery(this).html();
    clean();
    getAll(abc);
})
/**
 * 详情返回的点击事件
 */
 jQuery(document).on("click",".back",function name() {
    clean();
    getAll();
})


