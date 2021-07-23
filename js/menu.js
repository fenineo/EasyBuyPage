// JavaScript Document

var jq = jQuery.noConflict();
jQuery(function(){
	jq(".leftNav ul li").live("mouseenter",
		function(){
			jq(this).find(".fj").addClass("nuw");
			jq(this).find(".zj").show();
		}
	
	)

	jq(".leftNav ul li").live("mouseleave",
		
		function(){
			jq(this).find(".fj").removeClass("nuw");
			jq(this).find(".zj").hide();
		}
	)


})