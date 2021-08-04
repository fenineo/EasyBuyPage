//分页框展示js

$(function (){
    //引入分页框样式
    var pageCss =
        "    <link type=\"text/css\" rel=\"stylesheet\" href=\"css/Page.css\" />"
    $("meta").after(pageCss);
});

//展示分页框的方法
function pageShow(pageBean){
    var pageIndex = pageBean.pageIndex;     //页码
    var pageSize = pageBean.pageSize;       //页容量
    var pageCount = pageBean.pageCount;     //总页数
    var totalCount = pageBean.totalCount;   //总记录数
    var list = pageBean.list;               //查询对象集合

    if(list.length > 0){
        //分页框拼接
        var pageBox = "<div class=\"page\" onclick=\"page(1)\">首页</div>";
        if(pageIndex > 1){
            pageBox += "<div class=\"page\" onclick=\"page("+(pageIndex-1)+")\">上一页</div>";
        }
        if(pageCount > 5 && pageIndex > 2 && pageCount-pageIndex > 4){
            for(var i = pageIndex-2;i<pageIndex+3;i++){
                if(i==pageIndex){
                    pageBox += "<div class=\"page_ck\" onclick=\"page("+i+")\">"+i+"</div>";
                }else{
                    pageBox += "<div class=\"page\" onclick=\"page("+i+")\">"+i+"</div>";
                }
            }
            pageBox += "...s<div class=\"page\" onclick=\"page("+pageCount+")\">"+pageCount+"</div>";
        }else{
            for(var i = 1;i <= pageCount;i++){
                if(i == pageIndex){
                    pageBox += "<div class=\"page_ck\" onclick=\"page("+i+")\">"+i+"</div>";
                }else{
                    pageBox += "<div class=\"page\" onclick=\"page("+i+")\">"+i+"</div>";
                }
            }
        }
        if(pageIndex < pageCount){
            pageBox += "<div class=\"page\" onclick=\"page("+(pageIndex+1)+")\">下一页</div>";
        }
        pageBox += "<div class=\"page\" onclick=\"page("+pageCount+")\">尾页</div>";
        $("#pageBox").append(pageBox);
    }
}