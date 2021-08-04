$(document).ready(
    $.ajax({
        URL:"htttp://localhost:8888/easybuy/getNewsDesc",
        dataType: "json",
        success: function(result){
            var abc="<li><a href=\"#\">"+result[0].title+"</a></li>\n" +
            "        <li><a href=\"#\">"+result[1].title+"</a></li>\n" +
            "        <li><a href=\"#\">"+result[2].title+"</a></li>\n" +
            "        <li><a href=\"#\">"+result[3].title+"</a></li>\n" +
            "        <li><a href=\"#\">"+result[4].title+"</a></li>";
        }
    })
)