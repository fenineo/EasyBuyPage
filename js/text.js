var pgIndex = 0;//当前页码
var pageCount = 0;//总页数
var list = null;
jQuery(function(){
    getAll();
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
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success: function(result){
            pageCount = result.pageCount;
            pgIndex = result.pageIndex;
            list = result.list;
            //新闻列表拼接
            var newsTable = "";
            for(var i = 0;i < list.length;i++){
                
                newsTable +=
                "<tr>"+
                "   <td width="+"50%"+" class='look' name="+list[i].id+">"+list[i].title+"</td>"+
                "   <td width="+"30%"+">"+list[i].createTime+"</td>"+
                "<td width="+"20%"+"><input type='button' class='update' name="+list[i].id+" value='修改'>&nbsp;&nbsp;<input type='button' class='delete' name="+list[i].id+" value='删除'></td>\n"+
                "</tr>"
            }
            jQuery("#first_tr").after(newsTable);
            // //分页框拼接
            // var pageBox = "<div class=\"page\" onclick=\"page(1)\">首页</div>";
            // if(result.pageIndex>1){
            //     pageBox += "<div class=\"page\" onclick=\"page("+(result.pageIndex-1)+")\">上一页</div>";
            // }
            // if(pageCount>5 && pageIndex>2){
            //     for(var i = pageIndex-2;i<pageIndex+3;i++){
            //         if(i==pageIndex){
            //             pageBox += "<div class=\"page_ck\" onclick=\"page("+i+")\">"+i+"</div>";
            //         }else{
            //             pageBox += "<div class=\"page\" onclick=\"page("+i+")\">"+i+"</div>";
            //         }
            //     }
            // }else{
            //     for(var i = 1;i<=pageCount;i++){
            //         if(i==pageIndex){
            //             pageBox += "<div class=\"page_ck\" onclick=\"page("+i+")\">"+i+"</div>";
            //         }else{
            //             pageBox += "<div class=\"page\" onclick=\"page("+i+")\">"+i+"</div>";
            //         }
            //     }
            // }
            // if(result.pageIndex<pageCount){
            //     pageBox += "<div class=\"page\" onclick=\"page("+(result.pageIndex+1)+")\">下一页</div>";
            // }
            // pageBox += "<div class=\"page\" onclick=\"page("+pageCount+")\">尾页</div>";
            // jQuery("#pageBox").append(pageBox);
            pageShow(result);
        }
    })
 }
 
 /**
  * 
  * 页面跳转的方法
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
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success: function(result){
            jQuery("#selete").append(
            "<ul >\n"+
            "<li>新闻标题:"+result.title+"</li>\n"+ 
            "<li>新闻内容:"+result.content+"</li>\n"+   
            "<li>发布时间:"+result.createTime+"</li>\n"+      
            "</ul>"
            )
            jQuery("#pageBox").append("<input type='button' class='back'  value='返回'>")
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
            beforeSend:function (XMLHttpRequest){
                XMLHttpRequest.setRequestHeader("token",token);
            },
            success: function(result){
                alert("成功");
                window.location.href = "/Member_Money.html";
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
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success: function(result){
            alert("添加成功");
            window.location.href = "/Member_Money.html";
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
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
        success: function(result){
            alert("修改成功");
            window.location.href = "http://localhost:8888/Member_Money.html";
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
 * 删除的点击事件
 */
jQuery(document).on("click",".delete",function name() {
    var id=jQuery(this).attr("name")
    remove(id);
})
/**
 * 详情返回的点击事件
 */
 jQuery(document).on("click",".back",function name() {
    window.location.href = "/Member_Money.html";
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
    jQuery("#page").append("<input type='button' class='back'  value='返回列表'>")
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
        beforeSend:function (XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("token",token);
        },
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
        jQuery.ajax({
            url:"/easybuy/News/getAllNews",
            dataType: "json",
            beforeSend:function (XMLHttpRequest){
                XMLHttpRequest.setRequestHeader("token",token);
            },
            success: function(result){
                var flag=false;
                for(var i=0;i<result.length;i++){
                    if(result[i].title==title){
                        flag=true;
                    }
                }
                if(!flag){
                    addNews(title,content);
                }else{
                    alert("标题重复");
                }
            }})
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


