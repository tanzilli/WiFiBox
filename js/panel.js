// Open a websocket with the server
var wsCommand = new WebSocket("ws://" + location.host + "/websocket");
var thumbSize=120;

function liveAll() {
	wsCommand.send('{"cmd":"titolo_1","text":"' + $("#titolo_1_text").val() + '"}');
	wsCommand.send('{"cmd":"titolo_2","text":"' + $("#titolo_2_text").val() + '"}');
}

function sendSlide(slide) {
	wsCommand.send('{"cmd":"slide","slide":"/artisti/' + slide + '"}');
}

function ShowThumbnail(slideslist) {
	spazio_disponibile=$(document).width();
	thumbPerRiga=Math.floor(spazio_disponibile/thumbSize);

	htmlcontents="";
	tCount=0;
	for (var slide in slideslist) {
		htmlcontents+="<img class='slide' src='/artisti/" + slideslist[slide] + "' width='" + thumbSize + "' title='" + slideslist[slide] + "'/>";
		tCount++;
		if (tCount==thumbPerRiga) {	
			htmlcontents+="<br/>";
			tCount=0;
		}
	}	
	$("#thumbnaillist").html(htmlcontents);
	$(".slide").click(function() {
		wsCommand.send('{"cmd":"slide","slide":"' + $(this).attr("src") + '"}');
	});
	$("#titolo_1_live").click(function() {
		wsCommand.send('{"cmd":"titolo_1","text":"' + $("#titolo_1_text").val() + '"}');
	});
	$("#titolo_2_live").click(function() {
		wsCommand.send('{"cmd":"titolo_2","text":"' + $("#titolo_2_text").val() + '"}');
	});
	$(".select_text").click(function() {
		//alert($(this).find('option:selected').text());
		titolo_1=$(this).find('option:selected').text();
		titolo_2=$(this).val();
		if (titolo_1=="Blank") {
			$("#titolo_1_text").val("");
			$("#titolo_2_text").val("");
		} else {
			$("#titolo_1_text").val(titolo_1);
			$("#titolo_2_text").val(titolo_2);
		}	
		liveAll();
		slide_name=$(this).find('option:selected').attr("name");
		if (slide_name!=undefined) {
			sendSlide(slide_name);
		} else {
			sendSlide("banner.png");
		}	
	});
}

$(document).ready(function() {
	$("#tabs").tabs();
	// Load the slides list
	$.ajax({
		dataType: "json",
		url: "/slideslist",
		type: "get",
		success: function (data,stato) {
			slideslist=data;
			ShowThumbnail(slideslist);
	    },
    	error: function (richiesta,stato,errori) {
        	alert("Error: " + stato);
    	}
	});
});	
