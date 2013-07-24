// Open a websocket with the server
var wsCommand = new WebSocket("ws://" + location.host + "/websocket");

function liveAll() {
	wsCommand.send('{"cmd":"titolo_1","text":"' + $("#titolo_1_text").val() + '"}');
	wsCommand.send('{"cmd":"titolo_2","text":"' + $("#titolo_2_text").val() + '"}');
	wsCommand.send('{"cmd":"titolo_3","text":"' + $("#titolo_3_text").val() + '"}');	
}

function copertina() {
	$("#titolo_1_text").val("Auditorium di Santa Scolastica");
	$("#titolo_2_text").val("5-9 Settembre 2013");
	$("#titolo_3_text").val("");
}

function clearAll() {
	$("#titolo_1_text").val("");
	$("#titolo_2_text").val("");
	$("#titolo_3_text").val("");
}

function ShowThumbnail(slideslist) {
	htmlcontents="";
	for (var slide in slideslist) {
		console.log(slideslist[slide]);
		htmlcontents+="<img class='slide' src='/slides/" + slideslist[slide] + "' width='240'/>";
		htmlcontents+="<br/>";
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
	$("#titolo_3_live").click(function() {
		wsCommand.send('{"cmd":"titolo_3","text":"' + $("#titolo_3_text").val() + '"}');
	});

}

$(document).ready(function() {
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
