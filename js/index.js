var websocket = new WebSocket("ws://" + location.host + "/websocket");

console.log("Ci sono");

$(document).ready(function() {
	$(".include-file").each (function () {
		$(this).load($(this).attr('file'));
		console.log("Ciao");
	});
});

websocket.onmessage=function(message) {
	obj = JSON.parse(message.data);
	if (obj.cmd=="poll") {
		$.mobile.changePage("#poll", "pop");
		
		$(".poll_button").click(function() {
			console.log("Poll !!!");
		});
	}
}
