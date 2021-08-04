jQuery(function(){
	jQuery.get("/easybuy/productCategory/tourist/twocategoryLevel2Id","a=1",succ3,"json");
	function succ3(list1) {
		var i;
		var u;


		var $fj=$(".leftNav>ul");


			var str = "";

			for (i=0;i<list1.length;i++){

			if(list1[i].type ==1) {
				str+="<li> <div class='fj'><span class='n_img'><span></span><img src='images/nav1.png' /></span><span class='fl' name='"+list1[i].id+"'>"+list1[i].name+"</span></div><div class='zj'><div class='zj_l'>";
				for (j=0;j<list1.length; j++){
				if(list1[j].type ==2 && list1[i].id == list1[j].parentId) {
					str+= " <div class='zj_l_c'> <h2>"+list1[j].name+"</h2>";

				for (k=0;k<list1.length;k++){
					if(list1[k].type ==3 && list1[j].id == list1[k].parentId) {
						str += "<a href='BrandList.html?id="+list1[k].id+"'>"+list1[k].name+"</a>|";

					}

				};
			}

			}
			}
			str+="</div></div></div></li>";
		};
		$fj.append(str)
	}
})
