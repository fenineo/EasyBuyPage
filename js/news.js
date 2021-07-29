$(document).ready(
    $.ajax({
        url:"/easybuy/News/tourist/getNewsDesc",
        dataType: "json",
        success: function(result){
            var abc="<li><a href=\"Member_Money_Charge.html?id="+result[0].id+"\" >"+result[0].title+"</a></li>\n" +
            "        <li><a href=\"Member_Money_Charge.html?id="+result[1].id+"\" >"+result[1].title+"</a></li>\n" +
            "        <li><a href=\"Member_Money_Charge.html?id="+result[2].id+"\" >"+result[2].title+"</a></li>\n" +
            "        <li><a href=\"Member_Money_Charge.html?id="+result[3].id+"\" >"+result[3].title+"</a></li>\n" +
            "        <li><a href=\"Member_Money_Charge.html?id="+result[4].id+"\" >"+result[4].title+"</a></li>";
            $("#News").append(abc)
        }
    })
)

