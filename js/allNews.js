
jQuery(function(){
    getAll();
 })
/**
 * 
 * 分页查询的方法
 * currentpage：当前页
 */
function getAll(currentpage) {
    jQuery.ajax({
        url:"/easybuy/News/getPageNews",
        dataType: "json",
        data:{"currentpage":currentpage},
        success: function(result){
            jQuery("#selete").append(
                "<tr >\n"+
                "<td width="+"50%"+" >新闻标题</td>\n"+
                "<td width="+"30%"+">时间</td>\n"+
                "<td width="+"20%"+">操作</td>\n"+
                "</tr>"
                );
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
        url:"/easybuy/News/findById",
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
            url:"/easybuy/News/removeNews",
            dataType: "json",
            data:{"id":id},
            success: function(result){
                alert("成功");
                clean();
                getAll();
            }
            
        })
    }
}
/**
 * 增加新闻的方法
 */
function addNews(title,content) {
    jQuery.ajax({
        url:"/easybuy/News/addNews",
        dataType: "json",
        data:{"title":title,"content":content},
        success: function(result){
            alert("添加成功");
            clean();
            getAll();
        }
        
    })
}
/**
 * 修改新闻的方法
 */
function modifyNews(id,title,content){
    jQuery.ajax({
        url:"/easybuy/News/modifyNews",
        dataType: "json",
        data:{"id":id,"title":title,"content":content},
        success: function(result){
            alert("修改成功");
            clean();
            getAll();
        }
        
    })
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
  * 详情的点击事件
  */
 jQuery(document).on("click",".look",function name() {
    var id=jQuery(this).attr("name")
    clean();
    findbyid(id);
})
/**
 * 删除的点击事件
 */
jQuery(document).on("click",".delete",function name() {
    var id=jQuery(this).attr("name")
    remove(id);
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
/**
 * 添加的点击事件
 */
 jQuery(document).on("click","#addNews",function name() {
    clean();
    jQuery("#selete").append(
            "<tr>/n"+
              	"<td class="+"ma_a"+" colspan="+"2"+" style="+"padding:12px 50px;"+">"+
                	"<span class="+"fl"+" style="+"color:#ff4e00; font-size:14px;"+">新闻添加</span>"+    
                "</td>/n"+
              "</tr>/n"+
            "<tr>"+                                                                                                                                                 
                "<td width="+"150"+" class="+"tx_l"+">新闻标题</td>"+                                                                                                                                   
                "<td width="+"680"+"><input type="+"text"+"  class="+"tx_ipt"+" /></td>/n"+
            "</tr>/n"+
            "<tr valign="+"top"+">/n"+
                "<td class="+"tx_l"+">新闻内容</td>/n"+
                "<td><textarea class="+"tx_txt"+"></textarea></td>/n"+
            "</tr>/n"+
            "<tr height="+"70"+">/n"+
                "<td colspan="+"2"+" align="+"center"+">"+
                	"<input type="+"submit"+" value="+"提交表单"+" class="+"btn_tj"+" />"+
                "</td>/n"+
            "</tr>"
    )
    jQuery("#page").append("<input type='button' class='back'  value='返回'>")
})
/**
  * 修改的点击事件
  */
 jQuery(document).on("click",".update",function name() {
    clean();
    var id=jQuery(this).attr("name");
    jQuery.ajax({
        url:"/easybuy/News/findById",
        dataType: "json",
        data:{"id":id},
        success: function(result){
            jQuery("#selete").append(
            "<tr>/n"+
              	"<td class="+"ma_a"+" colspan="+"2"+" style="+"padding:12px 50px;"+">"+
                	"<span class="+"fl"+" style="+"color:#ff4e00; font-size:14px;"+" name="+result.id+">新闻添加</span>"+    
                "</td>/n"+
              "</tr>/n"+
            "<tr>"+                                                                                                                                                 
                "<td width="+"150"+" class="+"tx_l"+">新闻标题</td>"+                                                                                                                                   
                "<td width="+"680"+"><input type="+"text"+"  class="+"tx_ipt"+" value="+result.title+"></td>/n"+
            "</tr>/n"+
            "<tr valign="+"top"+">/n"+
                "<td class="+"tx_l"+">新闻内容</td>/n"+
                "<td><textarea class="+"tx_txt"+" name="+result.content+">"+result.content+"</textarea></td>/n"+
            "</tr>/n"+
            "<tr height="+"70"+">/n"+
                "<td colspan="+"2"+" align="+"center"+">"+
                	"<input type="+"submit"+" value="+"提交表单"+" name="+result.id+" class="+"NewsUpdate"+" />"+
                "</td>/n"+
            "</tr>"
    )
        }
    })
    jQuery("#page").append("<input type='button' class='back'  value='返回'>")
 })
/**
 * 添加新闻提交表单的点击事件
 */
jQuery(document).on("click",".btn_tj",function name(){
    var title=jQuery(".tx_ipt").val();
    var content=jQuery(".tx_txt").val();
    if(title!="" && content!=""){
        addNews(title,content);
    }else{
        alert("标题或者内容未填写")
    }
    
})
/**
 * 修改新闻表单的点击事件
 */
 jQuery(document).on("click",".NewsUpdate",function name(){
    var id=jQuery(this).attr("name");
    var title=jQuery(".tx_ipt").val();
    var content=jQuery(".tx_txt").val();
    modifyNews(id,title,content);
})


