// Open a websocket with the server
var wsCommand = new WebSocket("ws://" + location.host + "/websocket");

function ShowThumbnail(slideslist) {
	htmlcontents="";
	for (var slide in slideslist) {
		console.log(slideslist[slide]);
		htmlcontents+="<table>";
		htmlcontents+="<tr>";
		htmlcontents+="<td>";
		htmlcontents+="<img class='slide' src='/slides/" + slideslist[slide] + "' width='240'/>";
		htmlcontents+="</td>";
		htmlcontents+="<td>";
		htmlcontents+="<button class='thumbnaillive' image='/slides/" + slideslist[slide] + "'>Live</button>";
		htmlcontents+="</td>";
		htmlcontents+="</tr>";
		htmlcontents+="</table>";
		htmlcontents+="<br/>";
	}	
	$("#thumbnaillist").html(htmlcontents);
	$(".thumbnaillive").click(function() {
		console.log($(this).attr("image"));
		wsCommand.send('{"cmd":"slide","slide":"' + $(this).attr("image") + '"}');
	});
}

$(document).ready(function() {
	
	$("#reloadbutton").click(function() {
		console.log("Reload");
		window.location.reload(true);
	});
	
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
