var websocket = new WebSocket("ws://" + location.host + "/websocket");

console.log("Partito !");

websocket.onmessage=function(message) {
	obj = JSON.parse(message.data);
	if (obj.cmd=="poll") {
		$.mobile.changePage("#poll", "pop");
		
		$(".poll_button").click(function() {
			console.log("Poll !!!");
		});
	}
}
